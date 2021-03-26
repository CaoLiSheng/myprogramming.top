import { scrollToCoords } from './scroll';

type Coords = ( Element | number | null )[];

function newCoords ( direction: boolean ): Coords {
  const parent = document.querySelector( '#main' );
  const current = parent?.scrollTop || 0;
  const height = ( parent as HTMLElement | null )?.offsetHeight || 0;
  const y = current + ( direction ? 0.36 : -0.36 ) * height;
  return [ parent, y ];
}

function hotkeys ( evt: KeyboardEvent ): void {
  let parent: Element | number | null;
  let y: Element | number | null;

  switch ( evt.key ) {
    case 'Left': // IE/Edge specific value
    case 'ArrowLeft':
      [ parent, y ] = newCoords( false );
      scrollToCoords( parent as Element | null, y as number );
      break;
    case 'Right': // IE/Edge specific value
    case 'ArrowRight':
      [ parent, y ] = newCoords( true );
      scrollToCoords( parent as Element | null, y as number );
      break;
    default:
      break;
  }
};

export default function init (): void {
  window.addEventListener( 'keydown', hotkeys );

  window.addEventListener( 'beforeunload', () => {
    window.removeEventListener( 'keydown', hotkeys );
  } );
}

let lastSpaceKeyHit = 0;

export const bindDoubleSpaceKey = ( callback: () => void, ev: KeyboardEvent ): void => {
  if ( ev.key !== ' ' ) {
    lastSpaceKeyHit = 0;
    return;
  }

  ev.preventDefault();

  const now = performance.now();
  if ( now - lastSpaceKeyHit < 300 ) {
    lastSpaceKeyHit = 0;
    callback();
    return;
  }

  lastSpaceKeyHit = now;
};
