import yargs from 'yargs';

interface Argv {
  tplPath: string;
  outDir: string;
  inDir: string;
}

const { argv } = yargs
  .option ( 'tplPath', {
    description: 'HTML模板路径',
    type       : 'string',
  } )
  .option ( 'outDir', {
    description: '输出目录',
    type       : 'string',
  } )
  .option ( 'inDir', {
    description: '输入目录',
    type       : 'string',
  } )
  .help ()
  .alias ( 'help', 'h' );

console.log ( 'argv', argv );

if ( !argv.tplPath ) throw new Error ( 'Lack of [HTML模板路径]' );
if ( !argv.outDir ) throw new Error ( 'Lack of [输出目录]' );
// in dir has a default value "./posts"
// if ( !argv.inDir ) throw new Error ( 'Lack of [输入目录]' );

export default argv as Argv;
