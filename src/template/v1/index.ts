import '@audios/click';
import { scrollToCoords, scroolToElement } from '@www/utils/scroll';

declare var __origin__: string;
declare var __site_root__: string;

// 重定向生成的HTML页面到网站
function checkIfNakedStatus() {
  if (window.top === window) {
    location.href = __site_root__;
  }
}
checkIfNakedStatus();

// support snaplist mode
function checkIfSanpshotMode() {
  if (location.hash !== '#snapshot') {
    document.body.classList.remove('snapshot');
  }
}
checkIfSanpshotMode();

// support closing categories on mobile site
function postClickedMessage() {
  window.top.postMessage('iframe.detail clicked', __origin__);
}
document.body.addEventListener('click', postClickedMessage);

// 防盗链
const token = Date.now();
function checkIfLightUpValid(e: MessageEvent) {
  if (e.data === `show-time ${token}`) {
    document
      .querySelector('article.markdown-body.hidden')
      ?.classList.remove('hidden');
  }
}
window.addEventListener('message', checkIfLightUpValid);
window.top.postMessage(`is-it-time-to-show ${token}`, __origin__);

// support opening download urls
function extendDownloadLink(anchor: HTMLAnchorElement): boolean {
  if (anchor.getAttribute('download')) {
    anchor.setAttribute('target', '_top');
    return false;
  }
  return true;
}

// support scrolling to the-very-top
function scrollToTop(ev: MouseEvent) {
  ev.preventDefault();
  scrollToCoords(document.getElementById('main'), 0);
}
function extendBackToTop(anchor: HTMLAnchorElement, href?: string | null) {
  if (href === 'scroll-to-the-very-top') {
    anchor.addEventListener('click', scrollToTop);
    return false;
  }
  return true;
}

// support scrolling to element(header)
function scrollToHeader(ele: HTMLElement | null, ev: MouseEvent) {
  ev.preventDefault();
  scroolToElement(document.getElementById('main'), ele);
}
function extendScrollToHeader(anchor: HTMLAnchorElement, href?: string | null) {
  if (href?.startsWith('scroll-to:')) {
    anchor.addEventListener(
      'click',
      scrollToHeader.bind(
        anchor,
        document.getElementById(href?.substring('scroll-to:'.length))
      )
    );
    return false;
  }
  return true;
}

// support opening in new tab
function openInNewTab(href: string | null | undefined, ev: MouseEvent) {
  ev.preventDefault();
  window.top.postMessage(`please-open-in-new-tab ${href}`, __origin__);
}
function extendOpenInNewTab(anchor: HTMLAnchorElement, href?: string | null) {
  anchor.addEventListener('click', openInNewTab.bind(anchor, href));
  return false;
}

// Anchor扩展的抽象，返回true表示继续执行下一个扩展，false表示立即停止对当前Anchor进行扩展
type extender = (anchor: HTMLAnchorElement, href?: string | null) => boolean;

const anchorExtenders: extender[] = [
  extendDownloadLink,
  extendBackToTop,
  extendScrollToHeader,
  extendOpenInNewTab,
];
function extendAnchor(anchor: HTMLAnchorElement) {
  const href: string | null = anchor.getAttribute('href');

  for (
    let i = 0, ctn = anchorExtenders[i](anchor, href);
    ctn && i < anchorExtenders.length;
    i++, ctn = anchorExtenders[i](anchor, href)
  ) {}
}

document.querySelectorAll('a').forEach(extendAnchor);

// support table on mobile
function collectThData(thData: string[], elem: Element, i: number) {
  if (i === 0) {
    elem.classList.add('main');
  } else {
    thData[i] = elem.textContent ? (elem.textContent as string) : '';
  }
}
function bindThData(thData: string, tRow: Element) {
  const children = tRow.children;
  for (let i = 1; i < children.length; i++) {
    children[i].setAttribute('data-th', thData[i]);
  }
}
function extendTable(table: HTMLTableElement) {
  const thData: string[] = [];
  table
    .querySelectorAll('thead > tr > th')
    .forEach(collectThData.bind(null, thData));
  table.querySelectorAll('tbody > tr').forEach(bindThData.bind(null, thData));
}

document.querySelectorAll('.markdown-body table').forEach(extendTable);
