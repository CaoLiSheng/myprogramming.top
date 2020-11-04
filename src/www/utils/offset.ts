export interface HTMLElementOffset {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const EmptyOffset = { top: 0, left: 0, width: 0, height: 0 };

export function getOffset(ele?: HTMLElement | null): HTMLElementOffset {
  if (!ele) return EmptyOffset;

  const offset = {
    top: 0,
    left: 0,
    width: ele.offsetWidth,
    height: ele.offsetHeight,
  };

  while (ele.offsetParent) {
    offset.top += ele.offsetTop;
    offset.left += ele.offsetLeft;

    if (ele.offsetParent instanceof HTMLElement) {
      ele = ele.offsetParent;
    } else {
      return offset;
    }
  }

  return offset;
}
