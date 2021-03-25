import md5 from 'md5';

String.prototype.filter = function filterImpl (
  this: string,
  ...fns: ( ( file: string ) => boolean )[]
): boolean {
  const self = `${this}`;
  for ( const fn of fns ) {
    if ( fn( self ) ) continue;
    else return false;
  }
  return true;
};

String.prototype.md5 = function md5Impl (
  this: string,
  name: string,
  ext: string,
  len: number,
): string {
  return `${name}.${md5( this ).slice( 0, Math.max( 0, len ) )}.${ext}`;
};

String.prototype.toInt = function toIntImpl ( this: string ): ( number | undefined ) {
  let parsed: number = Number.NaN;

  try {
    parsed = Number.parseInt( this, 10 );

    if ( Number.isNaN( parsed ) ) return;
  } catch {
    console.error( `${ this } is not a integer.` );
  }
  
  return parsed;
};

String.prototype.uniqueCheck = ( function factory () {
  const checkers = {};
  return function uniqueCheckImpl ( this: string, key: string ): boolean {
    let theChecker = checkers[key];
    if ( !theChecker ) {
      checkers[key] = this;
      theChecker = checkers[key];
    }
    return this === theChecker;
  };
}() );
