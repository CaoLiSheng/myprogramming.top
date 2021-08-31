import localforage from 'localforage';

interface HistoryPluginConf { historyKey: string }

let lastHandler: () => void;

export async function initHistoryPlugin ( conf: HistoryPluginConf ): Promise<void> {
  const parent = document.querySelector ( '.markdown-body' )?.parentElement;
  if ( !parent ) return;

  const key = conf.historyKey;

  const scrollTopHistory = await localforage.getItem<number> ( key );
  parent.scrollTo ( 0, scrollTopHistory || 0 );

  parent.removeEventListener ( 'scroll', lastHandler );

  lastHandler = () => void localforage.setItem ( key, parent.scrollTop );

  parent.addEventListener ( 'scroll', lastHandler );
}
