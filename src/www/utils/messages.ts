function flyWindow (
  source: Window | MessagePort | ServiceWorker | null,
): Window | ServiceWorker | null {
  if ( source instanceof MessagePort ) return null;
  return source;
}

function showTime ( ev: MessageEvent ) {
  flyWindow( ev.source )?.postMessage( `show-time ${ ( ev.data as string ).split( ' ' )[1] }`, '*' );
}

function openInNewTab ( ev: MessageEvent ) {
  const [ , url ] = ( ev.data as string ).split( ' ' );
  const [ protocal, value ] = url.split( ':' );
  switch ( protocal ) {
    case 'post':
      window.open( `${window.location.pathname}#/post/${ value }`, '_blank' );
      break;
    default:
      window.open( url, '_blank' );
      break;
  }
}

const handlers: { [key: string]: ( ev: MessageEvent ) => void } = {
  'is-it-time-to-show': showTime,
  'please-open-in-new-tab': openInNewTab,
};

const handleMessage = ( ev: MessageEvent ) => {
  if ( typeof ev.data === 'string' ) {
    const [ key ] = ev.data.split( ' ' );
    if ( handlers[key] ) handlers[key]( ev );
  }
};

window.addEventListener( 'message', handleMessage, false );

window.addEventListener( 'beforeunload', () => {
  window.removeEventListener( 'message', handleMessage );
} );
