function scrollToZero() {
  const Speed = 45;
  const TheElem = document.getElementById('main');

  let lastFrameTime = performance.now();
  function frame() {
    const tmpNow = performance.now();
    const delta = tmpNow - lastFrameTime;
    lastFrameTime = tmpNow;

    const coords: number[] = [
      Math.max((TheElem?.scrollLeft || 0) - Speed * delta, 0),
      Math.max((TheElem?.scrollTop || 0) - Speed * delta, 0),
    ];

    if (coords.some((coord: number) => coord > 0)) {
      requestAnimationFrame(frame);
    }

    const [x, y] = coords;
    TheElem?.scrollTo(x, y);
  }

  requestAnimationFrame(frame);
}

function scrollToTopDelegate(ev: MouseEvent) {
  const target = ev.target;
  if (null === target) return;
  if (!(target instanceof HTMLAnchorElement)) return;
  const href = target.getAttribute('href');
  if ('scroll-to-the-very-top' === href) {
    ev.preventDefault();
    scrollToZero();
    return;
  }
  if (href?.startsWith('post:')) {
    ev.preventDefault();
    location.href = `${href.substring(5)}${location.hash}`;
    return;
  }
}

document.body.addEventListener('click', scrollToTopDelegate);

window.addEventListener('beforeunload', () => {
  document.body.removeEventListener('click', scrollToTopDelegate);
});
