console.log('\nloading...\n\n');

// console.log('字符串拼接的坑');
// console.log(1 + 2 + 3 + ' Hello');
// console.log(1 + 2 + ' Hello ' + 2 + 1);

function fabs(count: number) {
  let num0 = 1;
  let num1 = 1;
  for (let i = 0; i < count; i++) {
    console.log(num0);
    let tmp = num1;
    num1 = num0 + num1;
    num0 = tmp;
  }
}
// console.log('\n\nfabs(30)...\n');
// fabs(30);

function table9x9() {
  let line = 'x' + '\t';
  for (let i = 1; i <= 9; i++) line += i + '\t';
  console.log(line);

  for (let row = 1; row <= 9; row++) {
    line = row + '\t';
    for (let column = 1; column <= row; column++) {
      line += row * column + '\t';
    }
    console.log(line);
  }
}
// console.log('\n\ntable9x9()...\n');
// table9x9();

function perfectBody() {
  let line: string;
  for (let row = 1; row <= 5; row++) {
    line = '';
    for (let column = 1; column + row <= 10; column++) {
      if (column <= row - 1) line += '  ';
      else line += '* ';
    }
    console.log(line);
  }
}
// console.log('\n\nperfectBody()...\n');
// perfectBody();

function diff(n1: number, n2: number): number {
  if (n1 <= n2) {
    console.log('OH, n2 is bigger!');
    return n2 - n1;
  }
  return n1 - n2;
}
// console.log(
//   '\n\ndiff()...\n',
//   diff(1.0000000000000000000000002, 1.0000000000000000000000001)
// );

function invertCap(str: string): string {
  const lowerCaseReg = /[a-z]/;
  const upperCaseReg = /[A-Z]/;

  // wrong impl:
  // return str
  //   .replace(/[a-z]/g, (lower: string) => lower.toUpperCase())
  //   .replace(/[A-Z]/g, (upper: string) => upper.toLowerCase());

  const results: string[] = [];
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (lowerCaseReg.test(char)) results.push(char.toUpperCase());
    else if (upperCaseReg.test(char)) results.push(char.toLowerCase());
    else results.push(char);
  }
  return results.join('');
}
// console.log('\n\ninvertCap()...\n', invertCap('Hello World!'));

interface DBIndex {
  str: string;
  num: number;
}

const byStr = (i: DBIndex, v: any) => {
  return i.str === v;
};

function byNum(i: DBIndex, v: any): boolean {
  return i.num === v;
}

type Indexer = 'str' | 'num';

function searchByIndex(data: DBIndex[], flag: Indexer, v: any): DBIndex[] {
  let indexer: (i: DBIndex, v: any) => boolean;
  switch (flag) {
    case 'str':
      indexer = byStr;
      break;
    case 'num':
      indexer = byNum;
      break;
    default:
      throw new Error('Wrong flag ' + flag);
  }

  const results: DBIndex[] = [];
  data.forEach((i: DBIndex) => indexer(i, v) && results.push(i));
  return results;
}
