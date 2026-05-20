// src/components/swipeThreshold.ts
export type SwipeDirection = 'left' | 'right';

const DISTANCE_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 500;

export function shouldDismiss({
  offsetX,
  velocityX,
}: {
  offsetX: number;
  velocityX: number;
}): SwipeDirection | null {
  if (offsetX > DISTANCE_THRESHOLD || velocityX > VELOCITY_THRESHOLD) {
    return 'right';
  }
  if (offsetX < -DISTANCE_THRESHOLD || velocityX < -VELOCITY_THRESHOLD) {
    return 'left';
  }
  return null;
}
