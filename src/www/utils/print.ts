let articleRoot: HTMLDivElement | null = null;

function beforePrint () {
  console.log ( 'Functionality to run before printing.' );
  const originalRoot = document.querySelector ( 'body > .r' );
  articleRoot = document
    .querySelector ( '#main' )
    ?.cloneNode ( true ) as HTMLDivElement;
  if ( originalRoot && articleRoot ) {
    originalRoot.classList.add ( 'hidden' );
    document.body.append ( articleRoot );
  }
};

function  afterPrint () {
  console.log ( 'Functionality to run after printing' );
  const originalRoot = document.querySelector ( 'body > .r' );
  if ( originalRoot && articleRoot ) {
    articleRoot.remove ();
    originalRoot.classList.remove ( 'hidden' );
  }
};

window.addEventListener ( 'beforeprint', beforePrint );
window.addEventListener ( 'afterprint', afterPrint );
