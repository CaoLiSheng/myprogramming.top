// checking define variables
if (window['templateConfigs']) {
  const { __origin__, __site_root__ } = window['templateConfigs'];

  // support snaplist mode
  if (location.hash !== '#snapshot') {
    document
      .querySelector('article.markdown-body.snapshot')
      ?.classList.remove('snapshot');
  }

  // support closing categories on mobile site
  document.body.addEventListener('click', () => {
    window.top.postMessage('iframe.detail clicked', __origin__);
  });

  document.querySelectorAll('a').forEach((anchor) => {
    // support opening mine own post URLs
    const originalHref = anchor.getAttribute('href');
    if (originalHref?.startsWith('post:')) {
      anchor.setAttribute(
        'href',
        `${__site_root__}/#/${originalHref.replace(':', '/')}`
      );
      anchor.setAttribute('target', '_top');
    }
  });
}
