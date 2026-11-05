export interface LocalizedString {
  id: string;
  en: string;
}

export type DestinationKind = 'attraction' | 'lodging' | 'restaurant' | 'transport_hub' | 'service';
export type RegionSlug = 'palangka-raya' | 'kobar' | 'kotim' | 'gunung-mas' | 'seruyan';

export interface Destination {
  id: string;
  slug: string;
  kind: DestinationKind;
  region: RegionSlug;
  name: LocalizedString;
  aliases: string[];
  summary: LocalizedString;
  description: LocalizedString;
  tags: string[];
  lodging_tier?: 'budget' | 'mid' | 'upper';
  dietary?: string[];
  geom: { lat: number; lng: number };
  address: LocalizedString;
  opening_hours: {
    tz: string;
    open: string;
    close: string;
    days: string;
  };
  min_dwell_min: number;
  max_dwell_min: number;
  curated_rank: number;
  price_estimate_idr: number;
  facilities: string[];
  how_to_reach: LocalizedString;
  hero_color: string;
  image_url: string;
  is_demo: boolean;
}

export interface Offer {
  id: string;
  destination_id: string;
  partner_name: string;
  kind: 'ticket' | 'room' | 'meal' | 'klotok_charter' | 'car_rental' | 'guide';
  name: LocalizedString;
  unit: 'per_person' | 'per_night' | 'per_group' | 'per_day';
  price_idr: number;
  capacity_pax: number;
  min_duration_days?: number;
  instant_confirm: boolean;
  payment_methods: ('qris' | 'card')[];
}

export interface TravelEdge {
  from: string;
  to: string;
  mode: 'car' | 'boat' | 'flight' | 'walk';
  minutes: number;
  cost_idr: number;
  per: 'per_person' | 'per_group';
  notes?: LocalizedString;
}

export type TravelPace = 'relaxed' | 'balanced' | 'packed';

export interface TripIntent {
  origin?: string;
  region: RegionSlug;
  days: number;
  nights: number;
  pax: number;
  budget_idr: number;
  interests: string[];
  pace: TravelPace;
  lodging_tier?: 'budget' | 'mid' | 'upper';
  must_include_ids?: string[];
}

export interface ItineraryItem {
  id: string;
  destination_id: string;
  name: LocalizedString;
  kind: DestinationKind;
  time_start: string;
  time_end: string;
  dwell_min: number;
  cost_idr: number;
  is_pinned?: boolean;
  notes?: LocalizedString;
  offer_id?: string;
}

export interface ItinerarySegment {
  from_id: string;
  to_id: string;
  mode: 'car' | 'boat' | 'flight' | 'walk';
  minutes: number;
  cost_idr: number;
}

export interface ItineraryDay {
  day_number: number;
  date_label: LocalizedString;
  items: ItineraryItem[];
  transport_segments: ItinerarySegment[];
  day_cost_idr: number;
  summary: LocalizedString;
}

export interface Itinerary {
  id: string;
  title: LocalizedString;
  intent: TripIntent;
  days: ItineraryDay[];
  total_cost_idr: number;
  budget_idr: number;
  is_over_budget: boolean;
  budget_diff_idr: number;
  violations: Violation[];
  created_at: string;
}

export interface Violation {
  code: 'CLOSED' | 'OVERLAP' | 'TRAVEL_TOO_LONG' | 'OVER_BUDGET' | 'DISRUPTION';
  severity: 'error' | 'warning' | 'info';
  message: LocalizedString;
  fix_suggestion?: LocalizedString;
}

export interface Disruption {
  id: string;
  region: RegionSlug;
  title: LocalizedString;
  description: LocalizedString;
  severity: 'moderate' | 'severe';
  affected_destination_ids: string[];
  active_until: string;
  alternative_suggestion: LocalizedString;
}

export interface Voucher {
  id: string;
  booking_code: string;
  order_id: string;
  destination_name: LocalizedString;
  item_name: LocalizedString;
  partner_name: string;
  date_wib: string;
  pax: number;
  amount_idr: number;
  qr_payload: string;
  signature: string;
  is_used: boolean;
  status: 'confirmed' | 'pending' | 'used';
}

export interface Order {
  id: string;
  created_at: string;
  traveler_name: string;
  traveler_email: string;
  total_idr: number;
  payment_method: 'qris' | 'card';
  status: 'paid' | 'pending' | 'cancelled';
  vouchers: Voucher[];
  itinerary: Itinerary;
}

export * from './seed-data.js';
