import '../../../shims-string';

import { injectStyleSheetRules } from '../../utils/dom';

const SpriteId = 'click-ring';
const SpriteSize = 128;
const SpriteStartScale = 0.01;
const SpriteEndScale = 1.0001;
const SpriteAniDuration = '270ms';

function initSprite ( player: HTMLCanvasElement ) {
  player.id = SpriteId;
  player.width = SpriteSize;
  player.height = SpriteSize;
  player.style.borderRadius = '50%';
  player.style.background = `radial-gradient(circle ${ SpriteSize / 2 }px at 50% 50%, `
    + 'rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 95%, rgb(36, 126, 219, 0.8) 95%, rgb(36, 126, 219, 0.8) 100%)';
  player.style.pointerEvents = 'none';
  player.style.position = 'fixed';
  player.style.zIndex = '9999';

  // Animation
  injectStyleSheetRules ( `
    @keyframes AnimationSpriteRing {
        0% {
            opacity: 1;
            transform: scale3d(${ SpriteStartScale }, ${ SpriteStartScale }, 1);
        }

        30% {
            opacity: 0.999;
        }

        90% {
            transform: scale3d(${ SpriteEndScale }, ${ SpriteEndScale }, 1);
        }

        100% {
            opacity: 0;
            transform: scale3d(${ SpriteEndScale }, ${ SpriteEndScale }, 1);
        }
    }
  ` );
}

function posSprite ( player: HTMLCanvasElement, event: Event ) {
  if ( event instanceof MouseEvent ) {
    player.style.left = `${ event.clientX - SpriteSize / 2 }px`;
    player.style.top = `${ event.clientY - SpriteSize / 2 }px`;
  }

  player.style.animation = `${ SpriteAniDuration } ease-in 0s 1 normal both running AnimationSpriteRing`;
  player.style.visibility = 'visible';

  setTimeout ( () => {
    player.style.visibility = 'hidden';
    player.style.animation = 'none';
  }, Number.parseInt ( SpriteAniDuration, 10 ) );
}

const playHearts = ( name: string, event: Event ) => {
  if ( !name.uniqueCheck ( 'CLICK-RING' ) ) return;

  let player = document.querySelector ( `#${ SpriteId }` );
  
  if ( player ) {
    posSprite ( player as HTMLCanvasElement, event );
  } else {
    player = document.createElement ( 'canvas' );
    initSprite ( player as HTMLCanvasElement );
    document.body.append ( player );
    posSprite ( player as HTMLCanvasElement, event );
  }
};

// const mouseupListender = playHearts.bind(null, 'mouseup');
// const mousedownListender = playHearts.bind(null, 'mousedown');
// const touchstartListender = playHearts.bind(null, 'touchstart');
const mousedownListender = playHearts.bind ( null, 'mousedown' );

// document.body.addEventListener('mouseup', mouseupListender);
// document.body.addEventListener('mousedown', mousedownListender);
// document.body.addEventListener('touchstart', touchstartListender);
document.body.addEventListener ( 'mousedown', mousedownListender );

window.addEventListener ( 'beforeunload', () => {
  // document.body.removeEventListener('mouseup', mouseupListender);
  // document.body.removeEventListener('mousedown', mousedownListender);
  // document.body.removeEventListener('touchstart', touchstartListender);
  document.body.removeEventListener ( 'mousedown', mousedownListender );
} );
