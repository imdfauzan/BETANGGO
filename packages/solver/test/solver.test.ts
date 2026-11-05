import { describe, it, expect } from 'vitest';
import { solve, recompute, validate, replanForDisruption } from '../src/index';
import { TripIntent, SEED_DISRUPTIONS } from '@betanggo/shared';

describe('BetangGo Solver Engine', () => {
  it('should generate a valid 3-day itinerary with items and transport segments', () => {
    const intent: TripIntent = {
      region: 'palangka-raya',
      days: 3,
      nights: 2,
      pax: 2,
      budget_idr: 5000000,
      interests: ['nature', 'wildlife', 'culture'],
      pace: 'balanced'
    };

    const result = solve(intent);
    expect(result.days).toHaveLength(3);
    expect(result.total_cost_idr).toBeGreaterThan(0);
    expect(result.days[0].items.length).toBeGreaterThan(0);
    expect(result.days[0].transport_segments.length).toBeGreaterThan(0);
  });

  it('should flag over-budget violation if cost exceeds budget', () => {
    const intent: TripIntent = {
      region: 'palangka-raya',
      days: 4,
      nights: 3,
      pax: 2,
      budget_idr: 1000000, // Very low budget
      interests: ['nature'],
      pace: 'balanced'
    };

    const result = solve(intent);
    expect(result.is_over_budget).toBe(true);
    expect(result.violations.some(v => v.code === 'OVER_BUDGET')).toBe(true);
  });

  it('should replan when disruption occurs without crashing', () => {
    const intent: TripIntent = {
      region: 'palangka-raya',
      days: 2,
      nights: 1,
      pax: 1,
      budget_idr: 3000000,
      interests: ['river'],
      pace: 'balanced'
    };

    const plan = solve(intent);
    const disruption = SEED_DISRUPTIONS[0];
    const replanned = replanForDisruption(plan, disruption);

    expect(replanned).toBeDefined();
    expect(replanned.days).toHaveLength(2);
  });
});
