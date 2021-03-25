// import '@audios/click';
import '@sprites/ring';
import bindHotKeys, { bindDoubleSpaceKey } from '@www/utils/hotkeys';
import extendMDVW from '@www/utils/mdvw100';
import extendCodes from '@www/utils/code';
import extendTables from '@www/utils/table';
import extendFigure from '@www/utils/figure';
import extendHistory from '@www/utils/history';
import { scrollToCoords, scroolToElement } from '@www/utils/scroll';

declare let __origin__: string;
declare let __site_root__: string;

// 重定向生成的HTML页面到网站
function checkIfNakedStatus () {
  if ( window.top === window ) {
    window.location.href = __site_root__;
  }
}
checkIfNakedStatus();

// support snaplist mode
function checkIfSanpshotMode () {
  if ( window.location.hash !== '#snapshot' ) {
    document.body.classList.remove( 'snapshot' );
  }
}
checkIfSanpshotMode();

// support closing categories on mobile site
function postClickedMessage () {
  window.top.postMessage( 'iframe.detail clicked', __origin__ );
}
document.body.addEventListener( 'click', postClickedMessage );

// 防盗链
const token = Date.now();
function checkIfLightUpValid ( e: MessageEvent ) {
  if ( e.data === `show-time ${token}` ) {
    document
      .querySelector( 'article.markdown-body.hidden' )
      ?.classList.remove( 'hidden' );
  }
}
window.addEventListener( 'message', checkIfLightUpValid );
window.top.postMessage( `is-it-time-to-show ${token}`, __origin__ );

// support opening download urls
function extendDownloadLink ( anchor: HTMLAnchorElement ): boolean {
  if ( anchor.getAttribute( 'download' ) ) {
    anchor.setAttribute( 'target', '_top' );
    return false;
  }
  return true;
}

// support scrolling to the-very-top
function scrollToTop ( ev: MouseEvent ) {
  ev.preventDefault();
  scrollToCoords( document.querySelector( '#main' ), 0 );
}
function extendBackToTop ( anchor: HTMLAnchorElement, href?: string | null ) {
  if ( href === 'scroll-to-the-very-top' ) {
    anchor.addEventListener( 'click', scrollToTop );
    return false;
  }
  return true;
}

// support scrolling to element(header)
function scrollToHeader ( ele: HTMLElement | null, ev: MouseEvent ) {
  ev.preventDefault();
  scroolToElement( document.querySelector( '#main' ), ele );
}
function extendScrollToHeader ( anchor: HTMLAnchorElement, href?: string | null ) {
  if ( href?.startsWith( 'scroll-to:' ) ) {
    anchor.addEventListener(
      'click',
      scrollToHeader.bind(
        anchor,
        document.querySelector( `#${ href?.slice( 'scroll-to:'.length ) }` ),
      ),
    );
    return false;
  }
  return true;
}

// support opening in new tab
function openInNewTab ( href: string | null | undefined, ev: MouseEvent ) {
  ev.preventDefault();
  if ( href ) {
    window.top.postMessage( `please-open-in-new-tab ${ href }`, __origin__ );
  }
}
function extendOpenInNewTab ( anchor: HTMLAnchorElement, href?: string | null ) {
  anchor.addEventListener( 'click', openInNewTab.bind( anchor, href ) );
  return false;
}

// support opening gitee link
function extendGiteeLink ( anchor: HTMLAnchorElement, href?: string | null ) {
  const parts = href?.split( ':' );
  if ( !parts || parts.length !== 2 || parts[0] !== 'proj' ) return false;

  const projectName = parts[1];
  anchor.setAttribute( 'href', `https://www.gitee.com/yx1991/${projectName}` );
  return true;
}

// Anchor扩展的抽象，返回true表示继续执行下一个扩展，false表示立即停止对当前Anchor进行扩展
type extender = ( anchor: HTMLAnchorElement, href?: string | null ) => boolean;

const anchorExtenders: extender[] = [
  extendDownloadLink,
  extendBackToTop,
  extendScrollToHeader,
  extendOpenInNewTab,
  extendGiteeLink,
];
function extendAnchor ( anchor: HTMLAnchorElement ) {
  const href: string | null = anchor.getAttribute( 'href' );

  for (
    let i = 0, ctn = anchorExtenders[i]( anchor, href );
    ctn && i < anchorExtenders.length;
    i += 1, ctn = anchorExtenders[i]( anchor, href )
  );
}

document.querySelectorAll( 'a' ).forEach( extendAnchor );

// support table on mobile
extendTables();

// support code prettifed
extendCodes();

// support figure init scroll postition
extendFigure();

// support restore reading histories
void extendHistory();

// support --mdvw style property
extendMDVW( document.querySelector( '#main>.markdown-body' ) as HTMLElement );

// bind hot keys
bindHotKeys();

const bindDoubleSpaceKeyWithPostMessage = bindDoubleSpaceKey.bind( null, () => {
  window.top.postMessage( 'iframe.detail double.space', __origin__ );
} );

window.addEventListener( 'keypress', bindDoubleSpaceKeyWithPostMessage );

window.addEventListener( 'beforeunload', () => {
  window.removeEventListener( 'keypress', bindDoubleSpaceKeyWithPostMessage );
} );
