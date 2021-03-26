import localforage from 'localforage';

export default async function init (): Promise<void> {
  const parent = document.querySelector( '#main' );
  if ( !parent ) return;

  const scrollTopHistory = await localforage.getItem<number>( window.location.pathname );
  parent.scrollTo( 0, scrollTopHistory || 0 );

  parent.addEventListener( 'scroll', () => {
    void localforage.setItem( window.location.pathname, parent.scrollTop );
  } );
}
