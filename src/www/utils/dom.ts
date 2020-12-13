export function clickIn(
  target: HTMLElement | null | undefined,
  ...wrappers: (HTMLElement | null)[]
): boolean {
  if (!wrappers.length) return false;

  while (!!target) {
    if (wrappers.some((w) => w === target)) return true;
    target = target?.parentElement;
  }
  return false;
}
