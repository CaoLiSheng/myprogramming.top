const html = document.documentElement;

export function isMobileSize() {
  const width = html.offsetWidth;
  return {
    result: width <= 750,
    width,
  };
}

function setFontSize() {
  const judge = isMobileSize();
  if (judge.result) {
    html.style.fontSize = judge.width / 7.5 + 'px';
  } else {
    html.style.fontSize = 100 + 'px';
  }
}

let timer: any;
function setDelay() {
  return clearTimeout(timer), (timer = setTimeout(setFontSize, 150));
}

window.addEventListener('pageshow', function(evt) {
  return evt.persisted && setDelay();
});
window.addEventListener('resize', setDelay);
setFontSize();
