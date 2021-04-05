import { scrollToCoords, scroolToElement } from '@www/utils/scroll';

declare let __origin__: string;
declare let __site_root__: string;

function valid ( ...fns: ( ( ) => void )[] ): ( ( aElem: Element ) => void ) {
  return function validator ( aElem: Element ): void {
    if ( aElem instanceof HTMLAnchorElement ) {
      for ( const fn of fns ) {
        fn.call( aElem );
      }
    }
  }
}

function openInNewTab ( this: HTMLAnchorElement, ev: MouseEvent ): void {
  ev.preventDefault();

  const href = this.getAttribute( 'href' );
  if ( href ) {
    window.top.postMessage( `please-open-in-new-tab ${ href }`, __origin__ );
  }
}

function extendOpenInNewTab ( this: HTMLAnchorElement ): void {
  if ( window.top === window ) {
    this.setAttribute( 'target', '_blank' );
  } else {
    this.addEventListener( 'click', openInNewTab.bind( this ) )
  }
}

function extendDownloadLink ( this: HTMLAnchorElement ): void {
  this.setAttribute( 'target', '_top' );
}

function scrollToTop ( ev: MouseEvent ): void {
  ev.preventDefault();
  scrollToCoords( document.querySelector( '#main' ), 0 );
}

function extendBackToTop ( this: HTMLAnchorElement ): void {
  this.addEventListener( 'click', scrollToTop );
}

function split ( ...fns: ( ( info: string ) => void )[] ): ( ( this: HTMLAnchorElement ) => void ) {
  return function splitor ( this: HTMLAnchorElement ): void {
    const href = this.getAttribute( 'href' )?.split( ':' );
    if ( href && href.length === 2 ) {
      for ( const fn of fns ) {
        fn.call( this, href[1] );
      }
    }
  }
}

function extendGiteeLink ( this: HTMLAnchorElement, info: string ): void {
  this.setAttribute( 'href', `https://www.gitee.com/yx1991/${info}` );
}

function extendPostLink ( this: HTMLAnchorElement, info: string ): void {
  if ( window.top === window ) {
    this.setAttribute( 'target', '_self' );
    this.setAttribute( 'href', `${ info }${ window.location.hash }` );
  } else {
    this.removeAttribute( 'target' );
    this.setAttribute( 'href', `${ __site_root__ }#/post/${ info }` );
  }
}

function scrollToHeader ( ele: HTMLElement | null, ev: MouseEvent ): void {
  ev.preventDefault();
  scroolToElement( document.querySelector( '#main' ), ele );
}

function extendScrollToHeader ( this: HTMLAnchorElement, info: string ): void {
  this.addEventListener(
    'click',
    scrollToHeader.bind(
      this,
      document.querySelector( `#${ info }` ),
    ),
  );
}

export default function init (): void {
  const container = document.querySelector( '.markdown-body' );

  if ( !container ) return;

  container
    .querySelectorAll( 'a:not([href=scroll-to-the-very-top]):not([href^="scroll-to:"])' )
    .forEach( valid( extendOpenInNewTab ) );

  container.querySelectorAll( 'a[download]' ).forEach( valid( extendDownloadLink ) );

  container.querySelectorAll( 'a[href^="proj:"]' ).forEach( valid( split( extendGiteeLink ) ) );

  container.querySelectorAll( 'a[href^="post:"]' ).forEach( valid( split( extendPostLink ) ) );

  // 

  container.querySelectorAll( 'a[href=scroll-to-the-very-top]' ).forEach( valid( extendBackToTop ) );

  container.querySelectorAll( 'a[href^="scroll-to:"]' ).forEach( valid( split( extendScrollToHeader ) ) );
}
