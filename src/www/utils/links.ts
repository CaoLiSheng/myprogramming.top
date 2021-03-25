function extendGiteeLink ( aElem: Element ) {
  if ( !( aElem instanceof HTMLAnchorElement ) ) return;

  const href = aElem.getAttribute( 'href' )?.split( ':' );
  if ( !href || href.length !== 2 ) return;

  const projectName = href[1];
  aElem.setAttribute( 'href', `https://www.gitee.com/yx1991/${projectName}` );
}

export default function init () {
  document
    .querySelectorAll( '.markdown-body a[href^="proj:"]' )
    .forEach( extendGiteeLink );
}
