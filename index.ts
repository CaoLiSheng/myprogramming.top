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
console.log('\n\nfabs(30)...\n');
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
console.log('\n\ntable9x9()...\n');
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
console.log('\n\nperfectBody()...\n');
// perfectBody();
