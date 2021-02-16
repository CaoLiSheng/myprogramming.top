export default function(root: HTMLElement) {
  const setMDVW = () => {
    const elem = document.querySelector('#main>.markdown-body') as HTMLElement;
    const style = getComputedStyle(elem);
    const innerWidth =
      elem.offsetWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight);
    root.style.setProperty('--mdvw', `${(innerWidth * 0.01).toFixed(1)}px`);
  };

  window.addEventListener('load', setMDVW);
  window.addEventListener('resize', setMDVW);
}
