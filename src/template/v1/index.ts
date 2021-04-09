// import '@audios/click';
import '@sprites/ring';

import extendCodes from '@www/utils/code';
import extendFigure from '@www/utils/figure';
import extendHistory from '@www/utils/history';
import bindHotKeys, { bindDoubleSpaceKey } from '@www/utils/hotkeys';
import extendLinks from '@www/utils/links';
import extendMDVW from '@www/utils/mdvw100';
import extendTables from '@www/utils/table';

declare let __origin__: string;
declare let __site_root__: string;

// 重定向生成的HTML页面到网站
function checkIfNakedStatus () {
  if ( window.top === window ) {
    window.location.href = __site_root__;
  }
}
checkIfNakedStatus ();

// support snaplist mode
function checkIfSanpshotMode () {
  if ( window.location.hash !== '#snapshot' ) {
    document.body.classList.remove ( 'snapshot' );
  }
}
checkIfSanpshotMode ();

// support closing categories on mobile site
function postClickedMessage () {
  window.top.postMessage ( 'iframe.detail clicked', __origin__ );
}
document.body.addEventListener ( 'click', postClickedMessage );

// 防盗链
const token = Date.now ();
function checkIfLightUpValid ( e: MessageEvent ) {
  if ( e.data === `show-time ${ token }` ) {
    document
      .querySelector ( 'article.markdown-body.hidden' )
      ?.classList.remove ( 'hidden' );
  }
}
window.addEventListener ( 'message', checkIfLightUpValid );
window.top.postMessage ( `is-it-time-to-show ${ token }`, __origin__ );

// support links
extendLinks ();

// support table on mobile
extendTables ();

// support code prettifed
extendCodes ();

// support figure init scroll postition
extendFigure ();

// support restore reading histories
void extendHistory ();

// support --mdvw style property
extendMDVW ( document.querySelector ( '#main>.markdown-body' ) as HTMLElement );

// bind hot keys
bindHotKeys ();

const bindDoubleSpaceKeyWithPostMessage = bindDoubleSpaceKey.bind ( null, () => {
  window.top.postMessage ( 'iframe.detail double.space', __origin__ );
} );

window.addEventListener ( 'keypress', bindDoubleSpaceKeyWithPostMessage );

window.addEventListener ( 'beforeunload', () => {
  window.removeEventListener ( 'keypress', bindDoubleSpaceKeyWithPostMessage );
} );
