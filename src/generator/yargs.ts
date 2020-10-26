import yargs from 'yargs';

interface Argv {
  tplDir: string;
  tplPath: string;
  outPath: string;
}

const argv = yargs
  .option('tplDir', {
    alias: 'td',
    description: '模板脚本路径',
    type: 'string',
  })
  .option('tplPath', {
    alias: 'tp',
    description: '模板路径',
    type: 'string',
  })
  .option('outPath', {
    alias: 'op',
    description: '输出路径',
    type: 'string',
  })
  .help()
  .alias('help', 'h').argv;

console.log('argv', argv);

if (!argv.tplDir) throw new Error('Lack of 模板脚本路径');
if (!argv.tplPath) throw new Error('Lack of 模板路径');
if (!argv.outPath) throw new Error('Lack of 输出路径');

export default argv as Argv;
