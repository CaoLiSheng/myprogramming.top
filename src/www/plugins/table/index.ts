// support table on mobile
function collectThData ( thData: string[], elem: Element, i: number ): void {
  if ( i === 0 ) {
    elem.classList.add ( 'main' );
  } else {
    thData[i] = elem.textContent ? ( elem.textContent  ) : '';
  }
}

function bindThData ( thData: string[], tRow: Element ): void {
  const { children } = tRow;
  for ( let i = 1; i < children.length; i += 1 ) {
    children[i].setAttribute ( 'data-th', thData[i] );
  }
}

function extendTable ( table: Element ): void {
  const thData: string[] = Array.from ( ( table as HTMLTableElement ).rows[0].cells ).map ( () => '说明：' );
  table
    .querySelectorAll ( 'thead > tr > th' )
    .forEach ( collectThData.bind ( null, thData ) );
  table.querySelectorAll ( 'tbody > tr' ).forEach ( bindThData.bind ( null, thData ) );
}

export default function init (): void {
  document.querySelectorAll ( '.markdown-body table' ).forEach ( extendTable );
}
