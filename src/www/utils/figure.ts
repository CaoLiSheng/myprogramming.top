import { clamp } from './math';

function complete ( img: HTMLImageElement ): Promise<null> {
  return new Promise( ( resolve, reject ) => {
    let triedCount = 0;
    const maxTriedCount = 5;

    const callback = () => {
      triedCount += 1;
      if ( maxTriedCount === triedCount ) {
        reject();
        return;
      }

      if ( img.complete ) {
        resolve( null );
        return;
      }

      setTimeout( callback, 1000 );
    };

    setTimeout( callback, 1000 );
  } );
}

async function coordImage ( figureWrapper: Element, img: HTMLImageElement, x: string, y: string ): Promise<void> {
  await complete( img );

  const imgWidth = img.offsetWidth;
  const imgHeight = img.offsetHeight;

  const { offsetWidth: wrapperWidth, offsetHeight: wrapperHeight } = figureWrapper as HTMLElement;

  const scrollScaleX = Number.parseFloat( x );
  const scrollScaleY = Number.parseFloat( y );

  const scrollX = clamp(
    imgWidth * scrollScaleX - wrapperWidth / 2,
    0,
    imgWidth - wrapperWidth,
    false,
    true,
  );
  const scrollY = clamp(
    imgHeight * scrollScaleY - wrapperHeight / 2,
    0,
    imgHeight - wrapperHeight,
    false,
    true,
  );

  figureWrapper.scrollTo( scrollX, scrollY );
}

function extendFigure ( figureWrapper: Element ): void {
  const img = figureWrapper.children[0];
  const attr1 = figureWrapper.getAttribute( 'data-scroll-x' );
  const attr2 = figureWrapper.getAttribute( 'data-scroll-y' );
  if ( !attr1 || !attr2 || !( img instanceof HTMLImageElement ) ) return;

  void coordImage( figureWrapper, img, attr1, attr2 );  
}

export default function init (): void {
  document
    .querySelectorAll( '.markdown-body figure>.image' )
    .forEach( extendFigure );
}
