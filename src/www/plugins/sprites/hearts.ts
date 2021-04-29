import '@common/shims-string';

const SpriteId = 'click-sprite';
const SpriteSize = 30;

function initSprite ( player: HTMLCanvasElement ) {
  player.id = SpriteId;
  player.width = SpriteSize;
  player.height = SpriteSize;
  player.style.position = 'fixed';

  // testing
  player.style.background = 'black';
}

function posSprite ( player: HTMLCanvasElement, event: Event ) {
  console.log ( event instanceof MouseEvent );
  if ( event instanceof MouseEvent ) {
    player.style.left = `${ event.clientX - 15 }px`;
    player.style.top = `${ event.clientY - 15 }px`;
    console.log (
      player.style.left,
      player.style.top,
      event.clientX,
      event.clientY,
    );
  }
}

const playHearts = ( name: string, event: Event ) => {
  if ( !name.uniqueCheck ( 'CLICK-HEARTS' ) ) return;

  let player = document.querySelector ( `#${ SpriteId }` );
  if ( !player ) {
    player = document.createElement ( 'canvas' );
    initSprite ( player as HTMLCanvasElement );
    posSprite ( player as HTMLCanvasElement, event );
    document.body.append ( player );
  } else {
    posSprite ( player as HTMLCanvasElement, event );
  }
};

// const mouseupListender = playHearts.bind(null, 'mouseup');
const mousedownListender = playHearts.bind ( null, 'mousedown' );
const touchstartListender = playHearts.bind ( null, 'touchstart' );

// document.body.addEventListener('mouseup', mouseupListender);
document.body.addEventListener ( 'mousedown', mousedownListender );
document.body.addEventListener ( 'touchstart', touchstartListender );

window.addEventListener ( 'beforeunload', () => {
  // document.body.removeEventListener('mouseup', mouseupListender);
  document.body.removeEventListener ( 'mousedown', mousedownListender );
  document.body.removeEventListener ( 'touchstart', touchstartListender );
} );
