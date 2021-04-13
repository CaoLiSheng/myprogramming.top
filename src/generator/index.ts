import path from 'path';

import { DB } from '@common/db';
import fs from 'fs-extra';

import { converter, jsYAML, yamlSchema } from './converter';
import {
  extractPostName,
  inDir,
  isPost,
  outDir,
} from './file';
import { htmlMinify } from './minify';
import {
  copyTemplateAssets,
  dateTagHTML,
  emailLinkHTML,
  fetchCSS,
  hmBaidu,
  titleTag,
  titleTagHTML,
  tplContent,
  tplScriptPath,
} from './template';

// DB
const dbData = new DB ();

// Clean & Make Out Dir
fs.mkdirSync ( outDir, { recursive: true } );
console.log ( 'inDir', inDir, '\noutDir', outDir, '\nready...' );

// Read Source Dir
const sources = fs.readdirSync ( inDir );

// Copy Template's Assets
copyTemplateAssets ();

// Generate HTML
const posts = sources.filter ( ( file: string ) => isPost ( file ) );
console.log ( 'Posts:', posts );

posts.forEach ( ( fileName: string ) => {
  console.log ( '\n\n', fileName, ':\n' );
  

  const fileContent = fs.readFileSync ( path.join ( inDir, fileName ), {
    encoding: 'UTF-8',
  } );

  /**
   * moved deprecated code to ./_deprecated.ts
   * where implements metadata parsing
   */
  const matches = fileContent.match ( /^[\S\s]*?---\n([\S\s]*?)---\n([\S\s]*)$/ );
  if ( !matches ) throw new Error ( `文章[ ${ fileName } ]头部信息解析出现错误！` );
  const [ rawMetadata, mdContent ] = matches.slice ( 1 );
  const body = converter.render ( mdContent );

  let metadata: unknown;

  try {
    metadata = jsYAML.safeLoad ( rawMetadata, { schema: yamlSchema } );
  } catch ( error ) {
    console.log ( error );
  }

  const {
    'no-receive-emails': noReceiveEmails, tags: tagsMd, style, title, date,
  } = metadata as {
    'no-receive-emails': string,
    tags?: string[],
    style: string,
    title: string,
    date: string,
  };
  
  const tags: string[] = [];
  if ( titleTag ( fileName ) ) tags.push ( titleTag ( fileName ) );
  if ( tagsMd ) tags.push ( ...tagsMd );

  console.log (
    'metadata:\n',
    [ rawMetadata, noReceiveEmails, style, title, date, tags, body ].join ( '\n\n' ),
    '\n',
  );

  const name = extractPostName ( fileName );
  const rowMeta = dbData.add ( {
    name, title, date, tags,
  } ).persist ();
  fs.writeFileSync (
    path.join ( outDir, `${ name }.html` ),
    htmlMinify (
      tplContent
        .replace ( '{{title}}', `${ title } | 又心真人的博客` )
        .replace ( '{{article_title}}', title )
        .replace ( '{{javascript}}', tplScriptPath () )
        .replace ( '{{hm_baidu}}', hmBaidu () )
        .replace ( '{{stylesheet}}', fetchCSS ( style ) )
        .replace ( '{{title_tag}}', titleTagHTML ( fileName ) )
        .replace ( '{{date_tag}}', dateTagHTML ( date, !rowMeta || rowMeta.top ) )
        .replace (
          '{{article_body}}',
          `${ body }${ emailLinkHTML ( fileName, noReceiveEmails, style, title ) }`,
        ),
    ),
    { encoding: 'UTF-8', flag: 'w' },
  );
} );
console.log ( 'All HTMLs Generated' );

const dbPath = path.join ( outDir, 'db.json' );
fs.createFileSync ( dbPath );
fs.writeFileSync ( dbPath, dbData.toString () );
console.log ( 'DB File Writen' );
