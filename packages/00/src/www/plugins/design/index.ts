function setMDVW (): void {
  const elem = document.querySelector ( '.markdown-body' );
  if ( !elem ) return;

  const style = getComputedStyle ( elem );
  const innerWidth = ( elem as HTMLElement ).offsetWidth
    - Number.parseFloat ( style.paddingLeft )
    - Number.parseFloat ( style.paddingRight );
  document.documentElement.style.setProperty ( '--mdvw', `${ ( innerWidth * 0.01 ).toFixed ( 1 ) }px` );
};

window.addEventListener ( 'resize', setMDVW );

export const initDesignPlugin = setMDVW;
