const html = document.documentElement;

export function isMobileSize () {
  const width = html.offsetWidth;
  return {
    result: width <= 750,
    width,
  };
}

function setFontSize () {
  const judge = isMobileSize();
  html.style.fontSize = judge.result ? `${judge.width / 7.5}px` : `${100}px`;
}

let timer: NodeJS.Timeout;
function setDelay () {
  clearTimeout( timer ); 
  timer = setTimeout( setFontSize, 150 );
}

window.addEventListener( 'pageshow', ( evt ) => evt.persisted && setDelay() );
window.addEventListener( 'resize', setDelay );
setFontSize();
