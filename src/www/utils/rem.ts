const html = document.documentElement;

export function isMobileSize (): { result: boolean, width: number } {
  const width = html.offsetWidth;
  return {
    result: width <= 750,
    width,
  };
}

function setFontSize (): void {
  const judge = isMobileSize ();
  html.style.fontSize = judge.result ? `${ judge.width / 7.5 }px` : `${ 100 }px`;
}

let timer: NodeJS.Timeout;
function setDelay (): void {
  clearTimeout ( timer ); 
  timer = setTimeout ( setFontSize, 150 );
}

window.addEventListener ( 'pageshow', ( evt ) => evt.persisted && setDelay () );
window.addEventListener ( 'resize', setDelay );
setFontSize ();
