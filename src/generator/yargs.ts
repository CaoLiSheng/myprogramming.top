import yargs from 'yargs';

interface Argv {
  tplPath: string;
  cssPath: string;
  tplDir: string;
  outDir: string;
  inDir: string;
}

const argv = yargs
  .option('tplPath', {
    description: 'HTML模板路径',
    type: 'string',
  })
  .option('cssPath', {
    description: 'CSS模板路径',
    type: 'string',
  })
  .option('tplDir', {
    description: '模板脚本目录',
    type: 'string',
  })
  .option('outDir', {
    description: '输出目录',
    type: 'string',
  })
  .option('inDir', {
    description: '输入目录',
    type: 'string',
  })
  .help()
  .alias('help', 'h').argv;

console.log('argv', argv);

if (!argv.tplPath) throw new Error('Lack of [HTML模板路径]');
if (!argv.cssPath) throw new Error('Lack of [CSS模板路径]');
if (!argv.tplDir) throw new Error('Lack of [模板脚本目录]');
if (!argv.outDir) throw new Error('Lack of [输出目录]');
// if (!argv.inDir) throw new Error('Lack of [输入目录]');

export default argv as Argv;
