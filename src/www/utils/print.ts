let articleRoot: HTMLDivElement | null = null;

const beforePrint = function() {
  console.log('Functionality to run before printing.');
  const originalRoot = document.querySelector('body > .r');
  articleRoot = document
    .getElementById('main')
    ?.cloneNode(true) as HTMLDivElement;
  if (originalRoot && articleRoot) {
    originalRoot.classList.add('hidden');
    document.body.appendChild(articleRoot);
  }
};

const afterPrint = function() {
  console.log('Functionality to run after printing');
  const originalRoot = document.querySelector('body > .r');
  if (originalRoot && articleRoot) {
    document.body.removeChild(articleRoot);
    originalRoot.classList.remove('hidden');
  }
};

window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;
