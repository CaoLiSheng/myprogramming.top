import { scrollToCoords, scroolToElement } from '@www/utils/scroll';

function articleAnchorClickDelegate(ev: MouseEvent) {
  const target = ev.target;
  if (null === target) return;
  if (!(target instanceof HTMLAnchorElement)) return;
  let it = target.parentElement;
  while (
    it &&
    it.tagName !== 'article' &&
    !it.classList.contains('markdown-body')
  ) {
    it = it.parentElement;
  }
  if (!it) return;
  ev.preventDefault();

  const attrHref = target.getAttribute('href');
  const [type, ...params] = attrHref?.split(':') || [];
  switch (type) {
    case 'scroll-to-the-very-top':
      scrollToCoords(document.getElementById('main'), 0);
      break;
    case 'scroll-to':
      const container = document.getElementById('main');
      const anchor = document.getElementById(params[0]);
      scroolToElement(container, anchor);
      break;
    case 'post':
      location.href = `${params[0]}${location.hash}`;
      break;
    default:
      throw new Error('Here is a bug -> ' + attrHref);
  }
}

document.body.addEventListener('click', articleAnchorClickDelegate);

window.addEventListener('beforeunload', () => {
  document.body.removeEventListener('click', articleAnchorClickDelegate);
});
