const setVh = () => {
  const vh = ( window.innerHeight * 0.01 ).toFixed( 1 );
  document.documentElement.style.setProperty( '--vh', `${vh}px` );
};

window.addEventListener( 'load', setVh );
window.addEventListener( 'resize', setVh );
