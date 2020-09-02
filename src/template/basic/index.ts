// checking define variables
if (window['templateConfigs']) {
  const { __origin__, __site_root__ } = window['templateConfigs'];

  // support snaplist mode
  var articleRoot;
  if (location.hash !== '#snapshot') {
    articleRoot = document.querySelector('article.markdown-body.snapshot');
  }
  if (articleRoot) articleRoot.classList.remove('snapshot');

  // support closing categories on mobile site
  document.body.addEventListener('click', () => {
    window.top.postMessage('iframe.detail clicked', __origin__);
  });

  document.querySelectorAll('a').forEach((anchor) => {
    // support opening page at new tab
    anchor.setAttribute('target', '_blank');

    // support opening relative URLs
    const originalHref = anchor.getAttribute('href');
    if (originalHref?.startsWith('/')) {
      anchor.setAttribute('href', `${__site_root__}${originalHref}`);
    }
  });
}
