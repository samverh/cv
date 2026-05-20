// src/components/swipeThreshold.ts
export type SwipeDirection = 'up' | 'down';

const DISTANCE_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 500;

export function shouldDismiss({
  offsetY,
  velocityY,
}: {
  offsetY: number;
  velocityY: number;
}): SwipeDirection | null {
  if (offsetY < -DISTANCE_THRESHOLD || velocityY < -VELOCITY_THRESHOLD) {
    return 'up';
  }
  if (offsetY > DISTANCE_THRESHOLD || velocityY > VELOCITY_THRESHOLD) {
    return 'down';
  }
  return null;
}
