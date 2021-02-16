import { scrollToCoords } from './scroll';

type Coords = (HTMLElement | number | null)[];

function newCoords(direction: boolean): Coords {
  const parent = document.getElementById('main');
  const current = parent?.scrollTop || 0;
  const height = parent?.offsetHeight || 0;
  const y = current + (direction ? 0.5 : -0.5) * height;
  return [parent, y];
}

const hotkeys = function(evt: KeyboardEvent) {
  console.log(evt.key);
  switch (evt.key) {
    case 'Left': // IE/Edge specific value
    case 'ArrowLeft':
      scrollToCoords.apply(null, newCoords(false));
      break;
    case 'Right': // IE/Edge specific value
    case 'ArrowRight':
      scrollToCoords.apply(null, newCoords(true));
      break;
  }
};

window.addEventListener('keydown', hotkeys);

window.addEventListener('beforeunload', () => {
  window.removeEventListener('keydown', hotkeys);
});
