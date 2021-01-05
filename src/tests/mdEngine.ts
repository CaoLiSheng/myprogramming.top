const path = require('path');
const filePath = path.join(
  process.cwd(),
  'posts/Book-Operating-System-Concepts-2-Operating-System-Structures.md'
);
console.log(filePath);

const fs = require('fs-extra');
const fileContent = fs.readFileSync(filePath, { encoding: 'UTF-8' });
console.log(fileContent);

const md = require('markdown-it')();
const result = md.render(fileContent);
console.log(result);
