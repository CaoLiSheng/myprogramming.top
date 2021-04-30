import { vary } from '../../common/math';

export function clickIn (
  target: HTMLElement | null | undefined,
  ...wrappers: ( HTMLElement | null )[]
): boolean {
  if ( wrappers.length === 0 ) return false;

  while ( target ) {
    if ( wrappers.includes ( target ) ) return true;
    target = target?.parentElement;
  }
  return false;
}

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

export function insertStyleSheetRule ( ruleText: string ): void {
  const sheets = document.styleSheets;

  if ( sheets.length === 0 ) {
    const style = document.createElement ( 'style' );
    style.append ( document.createTextNode ( '' ) );
    document.head.append ( style );
  }

  const sheet = sheets[sheets.length - 1];
  sheet.insertRule (
    ruleText,
    sheet.rules ? sheet.rules.length : sheet.cssRules.length,
  );
}

export function insertStyleSheetLinks ( ...hrefs: string[] ): void {
  for ( const href of hrefs ) {
    if ( document.querySelector ( `head>link[href="${ href }"]` ) ) continue;

    const link = document.createElement ( 'link' );
    link.setAttribute ( "rel", "stylesheet" );
    link.setAttribute ( "href", href );
    document.head.append ( link );
  }
}

export function scrollToCoords (
  parent: Element | null,
  y: number,
  x = 0,
): void {
  if ( !parent ) return;

  const Speed = 45;

  let lastFrameTime = performance.now ();
  function frame () {
    if ( !parent ) return;

    const tmpNow = performance.now ();
    const delta = tmpNow - lastFrameTime;
    lastFrameTime = tmpNow;

    const coords: number[] = [
      vary ( parent.scrollLeft, x, Speed * delta ),
      vary ( parent.scrollTop, y, Speed * delta ),
    ];

    if ( Math.abs ( coords[0] - x ) > 0 || Math.abs ( coords[1] - y ) > 0 ) {
      requestAnimationFrame ( frame );
    }

    const [ _x, _y ] = coords;
    parent.scrollTo ( _x, _y );
  }

  requestAnimationFrame ( frame );
}

export function scroolToElement (
  parent: Element | null,
  ele: Element | null,
): void {
  if ( !parent || !ele ) return;
  scrollToCoords ( parent, getOffset ( ele, parent ).top );
}
