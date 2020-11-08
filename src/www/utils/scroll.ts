import { vary } from './math';
import { getOffset } from './offset';

export function scrollToCoords(
  parent: HTMLElement | null,
  y: number,
  x: number = 0
) {
  if (!parent) return;

  const Speed = 45;

  let lastFrameTime = performance.now();
  function frame() {
    if (!parent) return;

    const tmpNow = performance.now();
    const delta = tmpNow - lastFrameTime;
    lastFrameTime = tmpNow;

    const coords: number[] = [
      vary(parent.scrollLeft, x, Speed * delta),
      vary(parent.scrollTop, y, Speed * delta),
    ];

    if (Math.abs(coords[0] - x) > 0 || Math.abs(coords[1] - y) > 0) {
      requestAnimationFrame(frame);
    }

    const [_x, _y] = coords;
    parent.scrollTo(_x, _y);
  }

  requestAnimationFrame(frame);
}

export function scroolToElement(
  parent: HTMLElement | null,
  ele: HTMLElement | null
) {
  if (!parent || !ele) return;
  scrollToCoords(parent, getOffset(ele, parent).top);
}
