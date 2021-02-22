// support table on mobile
function collectThData(thData: string[], elem: Element, i: number) {
  if (i === 0) {
    elem.classList.add('main');
  } else {
    thData[i] = elem.textContent ? (elem.textContent as string) : '';
  }
}
function bindThData(thData: string, tRow: Element) {
  const children = tRow.children;
  for (let i = 1; i < children.length; i++) {
    children[i].setAttribute('data-th', thData[i]);
  }
}
function extendTable(table: HTMLTableElement) {
  const thData: string[] = Array.from(table.rows[0].cells).map(() => '说明：');
  table
    .querySelectorAll('thead > tr > th')
    .forEach(collectThData.bind(null, thData));
  table.querySelectorAll('tbody > tr').forEach(bindThData.bind(null, thData));
}

export default function() {
  document.querySelectorAll('.markdown-body table').forEach(extendTable);
}
