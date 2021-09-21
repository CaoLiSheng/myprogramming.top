import { vary } from './math';

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

export function injectStyleSheetRules ( ...ruleTexts: string[] ): void {
  let style: HTMLStyleElement | null = document.querySelector ( '#custom-rules' );

  if ( !style ) {
    style = document.createElement ( 'style' );
    style.setAttribute ( 'id', 'custom-rules' );
    style.append ( document.createTextNode ( '' ) );
    document.head.append ( style );
  }

  const { sheet } = style;
  for ( const ruleText of ruleTexts ) {
    sheet?.insertRule (
      ruleText,
      sheet.rules ? sheet.rules.length : sheet.cssRules.length,
    );
  }
}

export function injectStyleSheetLinks ( ...hrefs: string[] ): Promise<void[]> {
  return Promise.all (
    hrefs
      .filter ( ( href: string ) => !document.querySelector ( `head>link[href="${ href }"]` ) )
      .map ( ( href: string ) => new Promise<void> ( ( resolve ) => {
        const link = document.createElement ( 'link' );
        link.addEventListener ( 'load', () => resolve () );
        link.setAttribute ( "rel", "stylesheet" );
        link.setAttribute ( "href", href );
        document.head.append ( link );
      } ) )
  );
}

export function injectJavaScripts ( ...srcs: string[] ): Promise<void[]> {
  return Promise.all (
    srcs
      .filter ( ( src: string ) => !document.querySelector ( `head>script[src="${ src }"]` ) )
      .map ( ( src: string ) => new Promise<void> ( ( resolve ) => {
        const script = document.createElement ( 'script' );
        script.addEventListener ( 'load', () => resolve () );
        script.setAttribute ( 'type', 'text/javascript' );
        script.setAttribute ( "src", src );
        document.head.append ( script );
      } ) )
  );
}

export function scrollToCoords (
  parent: Element | null | undefined,
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
  parent: Element | null | undefined,
  ele: Element | null | undefined,
): void {
  if ( !parent || !ele || !ele.parentElement ) return;

  const padOuter = window.getComputedStyle ( parent ).getPropertyValue ( 'padding-top' );
  const padInner = window.getComputedStyle ( ele.parentElement ).getPropertyValue ( 'padding-top' );
  
  scrollToCoords ( parent, getOffset ( ele, parent ).top - Number.parseFloat ( padOuter ) - Number.parseFloat ( padInner ) );
}
