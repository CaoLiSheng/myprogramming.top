// function flyWindow (
//     source: Window | MessagePort | ServiceWorker | null,
// ): Window | ServiceWorker | null {
//     if ( source instanceof MessagePort ) return null;
//     return source;
// }

// function showTime ( ev: MessageEvent ) {
//     flyWindow ( ev.source )?.postMessage ( `show-time ${ ( ev.data as string ).split ( ' ' )[ 1 ] }`, '*' );
// }