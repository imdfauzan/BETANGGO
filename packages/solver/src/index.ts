import {
  TripIntent,
  Itinerary,
  ItineraryDay,
  ItineraryItem,
  ItinerarySegment,
  Destination,
  Violation,
  Disruption,
  SEED_DESTINATIONS,
  SEED_OFFERS,
  SEED_EDGES
} from '@betanggo/shared';

export interface AlternativeOption {
  destination: Destination;
  price_diff_idr: number;
  reason: 'cheaper' | 'closer' | 'better_match' | 'same_area';
}

export function validate(plan: Itinerary): Violation[] {
  const violations: Violation[] = [];

  if (plan.total_cost_idr > plan.budget_idr) {
    const diff = plan.total_cost_idr - plan.budget_idr;
    violations.push({
      code: 'OVER_BUDGET',
      severity: 'error',
      message: {
        id: `Melebihi budget sebesar Rp ${diff.toLocaleString('id-ID')}.`,
        en: `Over budget by IDR ${diff.toLocaleString('en-US')}.`
      },
      fix_suggestion: {
        id: 'Gunakan fitur "Sesuaikan otomatis" untuk menurunkan tier penginapan atau kurangi 1 aktivitas.',
        en: 'Use "Fit to budget" to adjust lodging tier or reduce one activity.'
      }
    });
  }

  return violations;
}

export function solve(intent: TripIntent): Itinerary {
  const destinations = SEED_DESTINATIONS.filter(d => d.region === intent.region || intent.region === 'palangka-raya');
  const days: ItineraryDay[] = [];
  let currentTotalCost = 0;

  // Find lodging
  const lodging = destinations.find(d => d.kind === 'lodging' && (intent.lodging_tier ? d.lodging_tier === intent.lodging_tier : true)) ||
    destinations.find(d => d.kind === 'lodging') ||
    SEED_DESTINATIONS.find(d => d.kind === 'lodging')!;

  const lodgingOffer = SEED_OFFERS.find(o => o.destination_id === lodging.id);
  const roomCostPerNight = lodgingOffer ? lodgingOffer.price_idr : lodging.price_estimate_idr;

  // Attractions pool
  const attractions = destinations.filter(d => d.kind === 'attraction');
  const restaurants = destinations.filter(d => d.kind === 'restaurant');

  for (let i = 1; i <= intent.days; i++) {
    const dayItems: ItineraryItem[] = [];
    const daySegments: ItinerarySegment[] = [];
    let dayCost = 0;

    // Morning check-in/start at lodging
    if (i === 1) {
      dayItems.push({
        id: `item-d${i}-stay-start`,
        destination_id: lodging.id,
        name: lodging.name,
        kind: 'lodging',
        time_start: '08:00',
        time_end: '08:45',
        dwell_min: 45,
        cost_idr: 0,
        notes: { id: 'Check-in dan titip koper', en: 'Check-in and luggage drop' }
      });
    }

    // Morning attraction
    const morningAttraction = attractions[(i * 2 - 2) % attractions.length];
    if (morningAttraction) {
      const prevId = dayItems.length > 0 ? dayItems[dayItems.length - 1].destination_id : lodging.id;
      const edge = SEED_EDGES.find(e => (e.from === prevId && e.to === morningAttraction.id) || (e.from === lodging.id && e.to === morningAttraction.id));
      const travelMode = morningAttraction.tags.includes('river') ? 'boat' : 'car';
      const travelMins = edge ? edge.minutes : 25;
      const travelCost = edge ? edge.cost_idr : 35000;

      daySegments.push({
        from_id: prevId,
        to_id: morningAttraction.id,
        mode: travelMode,
        minutes: travelMins,
        cost_idr: travelCost
      });
      dayCost += travelCost;

      dayItems.push({
        id: `item-d${i}-attract-1`,
        destination_id: morningAttraction.id,
        name: morningAttraction.name,
        kind: 'attraction',
        time_start: '09:15',
        time_end: '11:45',
        dwell_min: morningAttraction.min_dwell_min || 120,
        cost_idr: morningAttraction.price_estimate_idr,
        is_pinned: false
      });
      dayCost += morningAttraction.price_estimate_idr;
    }

    // Lunch
    const restaurant = restaurants[(i - 1) % restaurants.length] || SEED_DESTINATIONS.find(d => d.kind === 'restaurant')!;
    if (restaurant) {
      const prevId = dayItems[dayItems.length - 1].destination_id;
      daySegments.push({
        from_id: prevId,
        to_id: restaurant.id,
        mode: 'car',
        minutes: 15,
        cost_idr: 25000
      });
      dayCost += 25000;

      dayItems.push({
        id: `item-d${i}-lunch`,
        destination_id: restaurant.id,
        name: restaurant.name,
        kind: 'restaurant',
        time_start: '12:00',
        time_end: '13:30',
        dwell_min: 90,
        cost_idr: restaurant.price_estimate_idr,
        notes: { id: 'Makan siang kuliner lokal Dayak', en: 'Traditional Dayak lunch' }
      });
      dayCost += restaurant.price_estimate_idr;
    }

    // Afternoon attraction
    const afternoonAttraction = attractions[(i * 2 - 1) % attractions.length];
    if (afternoonAttraction && afternoonAttraction.id !== morningAttraction?.id) {
      const prevId = dayItems[dayItems.length - 1].destination_id;
      daySegments.push({
        from_id: prevId,
        to_id: afternoonAttraction.id,
        mode: afternoonAttraction.tags.includes('river') ? 'boat' : 'car',
        minutes: 20,
        cost_idr: 30000
      });
      dayCost += 30000;

      dayItems.push({
        id: `item-d${i}-attract-2`,
        destination_id: afternoonAttraction.id,
        name: afternoonAttraction.name,
        kind: 'attraction',
        time_start: '14:00',
        time_end: '17:00',
        dwell_min: afternoonAttraction.min_dwell_min || 90,
        cost_idr: afternoonAttraction.price_estimate_idr,
        is_pinned: false
      });
      dayCost += afternoonAttraction.price_estimate_idr;
    }

    // Night return to lodging (except last night if checkout)
    if (i <= intent.nights) {
      dayCost += roomCostPerNight;
      dayItems.push({
        id: `item-d${i}-stay-night`,
        destination_id: lodging.id,
        name: {
          id: `Istirahat di ${lodging.name.id}`,
          en: `Overnight at ${lodging.name.en}`
        },
        kind: 'lodging',
        time_start: '19:30',
        time_end: '07:30',
        dwell_min: 720,
        cost_idr: roomCostPerNight,
        offer_id: lodgingOffer?.id
      });
    }

    currentTotalCost += dayCost;

    days.push({
      day_number: i,
      date_label: {
        id: `Hari ke-${i}`,
        en: `Day ${i}`
      },
      items: dayItems,
      transport_segments: daySegments,
      day_cost_idr: dayCost,
      summary: {
        id: `Menjelajahi pesona ${intent.region === 'kobar' ? 'Tanjung Puting & Sekonyer' : 'Palangka Raya dan budaya Dayak'}.`,
        en: `Exploring ${intent.region === 'kobar' ? 'Tanjung Puting & Sekonyer River' : 'Palangka Raya and Dayak heritage'}.`
      }
    });
  }

  const isOverBudget = currentTotalCost > intent.budget_idr;
  const budgetDiff = currentTotalCost - intent.budget_idr;

  const itinerary: Itinerary = {
    id: `plan-${Date.now()}`,
    title: {
      id: `${intent.days} Hari Eksplorasi ${intent.region === 'kobar' ? 'Kotawaringin Barat' : 'Palangka Raya'}`,
      en: `${intent.days} Days Exploring ${intent.region === 'kobar' ? 'Kotawaringin Barat' : 'Palangka Raya'}`
    },
    intent,
    days,
    total_cost_idr: currentTotalCost,
    budget_idr: intent.budget_idr,
    is_over_budget: isOverBudget,
    budget_diff_idr: budgetDiff,
    violations: [],
    created_at: new Date().toISOString()
  };

  itinerary.violations = validate(itinerary);
  return itinerary;
}

export function alternatives(plan: Itinerary, itemId: string): AlternativeOption[] {
  let targetItem: ItineraryItem | undefined;
  for (const day of plan.days) {
    targetItem = day.items.find(it => it.id === itemId);
    if (targetItem) break;
  }

  if (!targetItem) return [];

  const sameKind = SEED_DESTINATIONS.filter(d => d.kind === targetItem!.kind && d.id !== targetItem!.destination_id);

  return sameKind.map(dest => {
    const diff = dest.price_estimate_idr - targetItem!.cost_idr;
    let reason: 'cheaper' | 'closer' | 'better_match' | 'same_area' = 'better_match';
    if (diff < 0) reason = 'cheaper';
    else if (dest.region === plan.intent.region) reason = 'same_area';

    return {
      destination: dest,
      price_diff_idr: diff,
      reason
    };
  });
}

export function recompute(plan: Itinerary, itemId: string, newDestinationId: string): Itinerary {
  const newDest = SEED_DESTINATIONS.find(d => d.id === newDestinationId);
  if (!newDest) return plan;

  const newDays = plan.days.map(day => {
    let dayCost = 0;
    const newItems = day.items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          destination_id: newDest.id,
          name: newDest.name,
          cost_idr: newDest.price_estimate_idr
        };
      }
      return item;
    });

    for (const it of newItems) {
      dayCost += it.cost_idr;
    }
    for (const seg of day.transport_segments) {
      dayCost += seg.cost_idr;
    }

    return {
      ...day,
      items: newItems,
      day_cost_idr: dayCost
    };
  });

  const totalCost = newDays.reduce((sum, d) => sum + d.day_cost_idr, 0);

  const updated: Itinerary = {
    ...plan,
    days: newDays,
    total_cost_idr: totalCost,
    is_over_budget: totalCost > plan.budget_idr,
    budget_diff_idr: totalCost - plan.budget_idr,
    violations: []
  };

  updated.violations = validate(updated);
  return updated;
}

export function replanForDisruption(plan: Itinerary, disruption: Disruption): Itinerary {
  let updatedPlan = { ...plan };

  for (const affectedId of disruption.affected_destination_ids) {
    for (const day of updatedPlan.days) {
      const match = day.items.find(it => it.destination_id === affectedId);
      if (match) {
        const alts = alternatives(updatedPlan, match.id);
        const safeAlt = alts.find(a => !disruption.affected_destination_ids.includes(a.destination.id));
        if (safeAlt) {
          updatedPlan = recompute(updatedPlan, match.id, safeAlt.destination.id);
        }
      }
    }
  }

  return updatedPlan;
}

