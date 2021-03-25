export interface HTMLElementOffset {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const EmptyOffset = {
  top: 0, left: 0, width: 0, height: 0,
};

export function getOffset (
  ele?: Element | null,
  parent?: Element | null,
): HTMLElementOffset {
  if ( !ele ) return EmptyOffset;

  const { offsetTop: top, offsetLeft: left, offsetWidth: width, offsetHeight: height } = ele as HTMLElement;
  const offset = { top, left, width, height };

  let { offsetParent: it } = ele as HTMLElement;
  while ( !parent || it !== parent ) {
    if ( !( it instanceof HTMLElement ) ) return offset;

    offset.top += it.offsetTop;
    offset.left += it.offsetLeft;

    it = it.offsetParent;
  }

  return offset;
}
