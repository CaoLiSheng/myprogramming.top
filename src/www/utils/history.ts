import localforage from 'localforage';

export default async function init () {
  const parent = document.querySelector( '#main' );
  if ( !parent ) return;

  //   console.log(0);
  const scrollTopHistory = await localforage.getItem<number>( window.location.pathname );
  parent.scrollTo( 0, scrollTopHistory || 0 );
  //   console.log(1);

  parent.addEventListener( 'scroll', () => {
    // console.log(parent.scrollTop);
    void localforage.setItem( window.location.pathname, parent.scrollTop );
  } );
  //   console.log(2);
}
