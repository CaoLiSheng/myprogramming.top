import { scrollToCoords } from '../../utils/dom';

interface Coords { parent: Element | null | undefined, y: number }

function newCoords ( direction: boolean ): Coords {
  const parent = document.querySelector ( '.markdown-body' )?.parentElement;
  const current = parent?.scrollTop || 0;
  const height = ( parent as HTMLElement | null )?.offsetHeight || 0;
  const y = current + ( direction ? 0.36 : -0.36 ) * height;
  return { parent, y };
}

function hotkeys ( evt: KeyboardEvent ): void {
  let coords: Coords;

  switch ( evt.key ) {
    case 'Left': // IE/Edge specific value
    case 'ArrowLeft':
      coords = newCoords ( false );
      scrollToCoords ( coords.parent, coords.y );
      break;
    case 'Right': // IE/Edge specific value
    case 'ArrowRight':
      coords = newCoords ( true );
      scrollToCoords ( coords.parent, coords.y );
      break;
    default:
      break;
  }
};

window.addEventListener ( 'keydown', hotkeys );
window.addEventListener ( 'beforeunload', () => {
  window.removeEventListener ( 'keydown', hotkeys );
} );
