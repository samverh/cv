import { shouldDismiss } from './swipeThreshold';

describe('shouldDismiss', () => {
  it('returns null when below distance and velocity thresholds', () => {
    expect(shouldDismiss({ offsetY: 40, velocityY: 100 })).toBeNull();
    expect(shouldDismiss({ offsetY: -40, velocityY: -100 })).toBeNull();
  });

  it('returns "up" when offset exceeds 100 upward', () => {
    expect(shouldDismiss({ offsetY: -120, velocityY: 0 })).toBe('up');
  });

  it('returns "down" when offset exceeds 100 downward', () => {
    expect(shouldDismiss({ offsetY: 120, velocityY: 0 })).toBe('down');
  });

  it('returns "up" when velocity exceeds 500 upward', () => {
    expect(shouldDismiss({ offsetY: -10, velocityY: -600 })).toBe('up');
  });

  it('returns "down" when velocity exceeds 500 downward', () => {
    expect(shouldDismiss({ offsetY: 10, velocityY: 600 })).toBe('down');
  });
});
