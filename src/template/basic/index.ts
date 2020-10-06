import '@audios/click';

declare var __origin__: string;
declare var __site_root__: string;

// 重定向生成的HTML页面到骨架网站
if (window.top === window) {
  location.href = `${__site_root__}/#/post${location.pathname}`;
}

// 防盗链
const token = Date.now();
window.addEventListener('message', (e) => {
  if (e.data === `show-time ${token}`) {
    document
      .querySelector('article.markdown-body.hidden')
      ?.classList.remove('hidden');
  }
});
window.top.postMessage(`is-it-time-to-show ${token}`, __origin__);

// support snaplist mode
if (location.hash !== '#snapshot') {
  document.body.classList.remove('snapshot');
}

// support closing categories on mobile site
document.body.addEventListener('click', () => {
  window.top.postMessage('iframe.detail clicked', __origin__);
});

document.querySelectorAll('a').forEach((anchor: HTMLAnchorElement) => {
  // support opening download urls
  if (anchor.getAttribute('download')) {
    anchor.setAttribute('target', '_top');
    return;
  }

  let href: string | null = anchor.getAttribute('href');
  // support mail & tel
  // if (href?.startsWith('mailto:') || href?.startsWith('tel:')) {
  // anchor.setAttribute('data-rel', 'external');
  // anchor.setAttribute('target', '_blank');
  // anchor.addEventListener('click', () => window.open(href as string));
  // }

  // support opening insite posts
  if (href?.startsWith('post:')) {
    href = `${__site_root__}/#/${href.replace(':', '/')}`;
  }

  anchor.addEventListener('click', (ev: MouseEvent) => {
    ev.preventDefault();
    window.top.postMessage(`please-open-in-new-tab ${href}`, __origin__);
  });
});

// support table on mobile
function extendTable(table: HTMLTableElement) {
  const thData: string[] = [];
  table
    .querySelectorAll('thead > tr > th')
    .forEach((elem: Element, i: number) => {
      if (i === 0) {
        elem.classList.add('main');
      } else {
        thData[i] = elem.textContent ? (elem.textContent as string) : '';
      }
    });

  table.querySelectorAll('tbody > tr').forEach((tRow: Element) => {
    const children = tRow.children;
    for (let i = 1; i < children.length; i++) {
      children[i].setAttribute('data-th', thData[i]);
    }
  });
}

document.querySelectorAll('.markdown-body table').forEach(extendTable);
