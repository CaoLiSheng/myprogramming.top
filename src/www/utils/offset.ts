export interface HTMLElementOffset {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const EmptyOffset = { top: 0, left: 0, width: 0, height: 0 };

export function getOffset(
  ele?: HTMLElement | null,
  parent?: HTMLElement | null
): HTMLElementOffset {
  if (!ele) return EmptyOffset;

  const offset = {
    top: ele.offsetTop,
    left: ele.offsetLeft,
    width: ele.offsetWidth,
    height: ele.offsetHeight,
  };

  let it = ele.offsetParent;
  while (!parent || it !== parent) {
    if (!(it instanceof HTMLElement)) return offset;

    offset.top += it.offsetTop;
    offset.left += it.offsetLeft;

    it = it.offsetParent;
  }

  return offset;
}
