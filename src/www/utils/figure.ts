import { clamp } from './math';

function extendFigure(figureWrapper: HTMLElement) {
  const img = figureWrapper.children[0];
  const attr1 = figureWrapper.getAttribute('data-scroll-x');
  const attr2 = figureWrapper.getAttribute('data-scroll-y');
  if (!attr1 || !attr2 || !(img instanceof HTMLImageElement)) return;

  img.onload = () => {
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    const wrapperWidth = figureWrapper.offsetWidth;
    const wrapperHeight = figureWrapper.offsetHeight;

    const scrollScaleX = parseFloat(attr1);
    const scrollScaleY = parseFloat(attr2);

    const scrollX = clamp(
      imgWidth * scrollScaleX - wrapperWidth / 2,
      0,
      imgWidth - wrapperWidth,
      false,
      true
    );
    const scrollY = clamp(
      imgHeight * scrollScaleY - wrapperHeight / 2,
      0,
      imgHeight - wrapperHeight,
      false,
      true
    );
    figureWrapper.scrollTo(scrollX, scrollY);
  };
}

export default function() {
  document
    .querySelectorAll('.markdown-body figure>.image')
    .forEach(extendFigure);
}
