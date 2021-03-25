import bindHotKeys from '@www/utils/hotkeys';
import { scrollToCoords, scroolToElement } from '@www/utils/scroll';

function articleAnchorClickDelegate ( ev: MouseEvent ) {
  const { target } = ev;
  if ( target === null ) return;
  if ( !( target instanceof HTMLAnchorElement ) ) return;
  let it = target.parentElement;
  while (
    it
    && it.tagName !== 'article'
    && !it.classList.contains( 'markdown-body' )
  ) {
    it = it.parentElement;
  }
  if ( !it ) return;
  ev.preventDefault();

  let anchor;
  let container; 
  const attrHref = target.getAttribute( 'href' );
  const [ type, ...params ] = attrHref?.split( ':' ) || [];
  switch ( type ) {
    case 'scroll-to-the-very-top':
      scrollToCoords( document.querySelector( '#main' ), 0 );
      break;
    case 'scroll-to':
      container = document.querySelector( '#main' );
      anchor = document.querySelector( `${ params[0] }` );
      scroolToElement( container, anchor );
      break;
    case 'post':
      window.location.href = `${params[0]}${window.location.hash}`;
      break;
    default:
      if ( attrHref ) window.open( attrHref, '_blank' );
      break;
  }
}

document.body.addEventListener( 'click', articleAnchorClickDelegate );

window.addEventListener( 'beforeunload', () => {
  document.body.removeEventListener( 'click', articleAnchorClickDelegate );
} );

// bind hot keys
bindHotKeys();
