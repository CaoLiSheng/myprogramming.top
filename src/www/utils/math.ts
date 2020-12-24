export function vary(from: number, to: number, vilocity: number): number {
  const direction = to - from > 0;
  const clampFn = direction ? Math.min : Math.max;
  return clampFn(to, from + (direction ? 1 : -1) * vilocity);
}

export function clamp(
  value: number,
  min: number,
  max: number,
  minIngorable: boolean = false,
  maxIngorable: boolean = false
): number {
  if (min >= max) {
    if (minIngorable) return Math.min(max, value);
    if (maxIngorable) return Math.max(min, value);
  }
  return Math.max(min, Math.min(max, value));
}
