console.log ( '\nloading...\n\n' );

// console.log('字符串拼接的坑');
// console.log(1 + 2 + 3 + ' Hello');
// console.log(1 + 2 + ' Hello ' + 2 + 1);

function fabs ( count: number ) {
  let num0 = 1, num1 = 1;
  for ( let i = 0; i < count; i += 1 ) {
    console.log ( num0 );
    const tmp = num1;
    num1 = num0 + num1;
    num0 = tmp;
  }
}
// console.log('\n\nfabs(30)...\n');
// fabs(30);

function table9x9 () {
  let line = 'x\t';
  for ( let i = 1; i <= 9; i += 1 ) line += `${ i }\t`;
  console.log ( line );

  for ( let row = 1; row <= 9; row += 1 ) {
    line = `${ row }\t`;
    for ( let column = 1; column <= row; column += 1 ) {
      line += `${ row * column }\t`;
    }
    console.log ( line );
  }
}
// console.log('\n\ntable9x9()...\n');
// table9x9();

function perfectBody () {
  let line: string;
  for ( let row = 1; row <= 5; row += 1 ) {
    line = '';
    for ( let column = 1; column + row <= 10; column += 1 ) {
      line += column <= row - 1 ? '  ' : '* ';
    }
    console.log ( line );
  }
}
// console.log('\n\nperfectBody()...\n');
// perfectBody();

function diff ( n1: number, n2: number ): number {
  if ( n1 <= n2 ) {
    console.log ( 'OH, n2 is bigger!' );
    return n2 - n1;
  }
  return n1 - n2;
}
// console.log(
//   '\n\ndiff()...\n',
//   diff(1.0000000000000000000000002, 1.0000000000000000000000001)
// );

function invertCap ( str: string ): string {
  const lowerCaseReg = /[a-z]/;
  const upperCaseReg = /[A-Z]/;

  // wrong impl:
  // return str
  //   .replace(/[a-z]/g, (lower: string) => lower.toUpperCase())
  //   .replace(/[A-Z]/g, (upper: string) => upper.toLowerCase());

  const results: string[] = [];
  for ( let i = 0; i < str.length; i += 1 ) {
    const char = str.charAt ( i );
    if ( lowerCaseReg.test ( char ) ) results.push ( char.toUpperCase () );
    else if ( upperCaseReg.test ( char ) ) results.push ( char.toLowerCase () );
    else results.push ( char );
  }
  return results.join ( '' );
}
// console.log('\n\ninvertCap()...\n', invertCap('Hello World!'));

interface DBIndex {
  str: string;
  num: number;
}

const byStr = ( i: DBIndex, v: unknown ) => i.str === v;

function byNum ( i: DBIndex, v: unknown ): boolean {
  return i.num === v;
}

type Indexer = 'str' | 'num';

function searchByIndex ( data: DBIndex[], flag: Indexer, v: unknown ): DBIndex[] {
  let indexer: ( i: DBIndex, v: unknown ) => boolean;
  switch ( flag ) {
    case 'str':
      indexer = byStr;
      break;
    case 'num':
      indexer = byNum;
      break;
    default:
      break;
  }

  const results: DBIndex[] = [];
  data.forEach ( ( i: DBIndex ) => indexer ( i, v ) && results.push ( i ) );
  return results;
}

function invertColor ( color: string, isBody?: boolean ) {
  let r, g, b, a;

  // hex format
  if ( color.indexOf ( '#' ) === 0 ) {
    color = color.slice ( 1 );

    if ( color.length === 3 ) {
      r = Number.parseInt ( color[0] + color[0], 16 );
      g = Number.parseInt ( color[1] + color[1], 16 );
      b = Number.parseInt ( color[2] + color[2], 16 );
      a = 1;
    } else if ( color.length === 4 ) {
      r = Number.parseInt ( color[0] + color[0], 16 );
      g = Number.parseInt ( color[1] + color[1], 16 );
      b = Number.parseInt ( color[2] + color[2], 16 );
      a = Number.parseInt ( color[3] + color[3], 16 ) / 255;
    } else if ( color.length === 6 ) {
      r = Number.parseInt ( color.slice ( 0, 2 ), 16 );
      g = Number.parseInt ( color.slice ( 2, 4 ), 16 );
      b = Number.parseInt ( color.slice ( 4, 6 ), 16 );
      a = 1;
    } else if ( color.length === 8 ) {
      r = Number.parseInt ( color.slice ( 0, 2 ), 16 );
      g = Number.parseInt ( color.slice ( 2, 4 ), 16 );
      b = Number.parseInt ( color.slice ( 4, 6 ), 16 );
      a = Number.parseInt ( color.slice ( 6, 8 ), 16 ) / 255;
    } else {
      throw new Error ( 'Invalid hex color.' );
    }
  } else if ( color.indexOf ( 'rgb' ) === 0 ) {
    const parts = color
      .slice ( color.indexOf ( '(' ) + 1, color.indexOf ( ')' ) )
      .split ( ',' );
    r = Number.parseInt ( parts[0], 10 );
    g = Number.parseInt ( parts[1], 10 );
    b = Number.parseInt ( parts[2], 10 );
    a = parts[3] ? Number.parseFloat ( parts[3] ) : 1;
  } else {
    throw new Error ( 'Not Supported Yet!' );
  }

  // invert trasparent to black
  if ( isBody && a < 0.001 ) {
    return 'black';
  }

  // invert color components
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;
  const retVal = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed ( 2 ) })`;

  console.log ( 'debug invert color func', color, 'to', retVal );
  return retVal;
}

function invertProperty () {
  const regs = [
    //   '#[0-9a-fA-F]{3}',
    //   '#[0-9a-fA-F]{4}',
    //   '#[0-9a-fA-F]{6}',
    //   '#[0-9a-fA-F]{8}',
    'rgb\\(\\s*?\\d{1,3}\\s*?,\\d{1,3}\\s*?,\\d{1,3}\\s*?\\)',
    /rgba\(\s*?(?:\d{1,3}\s*?,){3}\s*?\d(.\d+)?\s*?\)/,
  ];

  const value = 'rgba(12,12,12,0.1)';
  let allReplaced = value;
  regs.forEach ( ( reg ) => {
    allReplaced = allReplaced.replace ( reg, ( $0 ) => invertColor ( $0 ) );
  } );
  console.log ( 'debug', value, 'to', allReplaced );
}

console.log ( 'invertProperty()', invertProperty () );

class Person {
  private _age: number;

  get age () {
    return this._age;
  }

  constructor ( age: number ) {
    this._age = age;
  }
}

const cory = new Person ( 100 );
console.log ( cory.age );
// console.log( cory._age );
