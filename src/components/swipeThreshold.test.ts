import { shouldDismiss } from './swipeThreshold';

describe('shouldDismiss', () => {
  it('returns null when below distance and velocity thresholds', () => {
    expect(shouldDismiss({ offsetX: 40, velocityX: 100 })).toBeNull();
    expect(shouldDismiss({ offsetX: -40, velocityX: -100 })).toBeNull();
  });

  it('returns "right" when offset exceeds 100 to the right', () => {
    expect(shouldDismiss({ offsetX: 120, velocityX: 0 })).toBe('right');
  });

  it('returns "left" when offset exceeds 100 to the left', () => {
    expect(shouldDismiss({ offsetX: -120, velocityX: 0 })).toBe('left');
  });

  it('returns "right" when velocity exceeds 500 to the right', () => {
    expect(shouldDismiss({ offsetX: 10, velocityX: 600 })).toBe('right');
  });

  it('returns "left" when velocity exceeds 500 to the left', () => {
    expect(shouldDismiss({ offsetX: -10, velocityX: -600 })).toBe('left');
  });
});
