export function vary(from: number, to: number, vilocity: number): number {
  const direction = to - from > 0;
  const clampFn = direction ? Math.min : Math.max;
  return clampFn(to, from + (direction ? 1 : -1) * vilocity);
}
