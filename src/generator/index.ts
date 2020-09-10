import path from 'path';
import fs from 'fs-extra';
import showdown from 'showdown';

import { getBodyPadding0, getBodyPadding1 } from '@tpl/styles';
import { DB } from '@common/db';

declare var __production__: boolean;
declare var __out_path__: string;
declare var __tpl_path__: string;
declare var __tpl_script_path__: string;

function isDir(file: string): boolean {
  return fs.statSync(path.join(inDir, file)).isDirectory();
}

function isFile(file: string): boolean {
  return fs.statSync(path.join(inDir, file)).isFile();
}

// Construct Converter
const converter = new showdown.Converter({
  extensions: [
    {
      type: 'lang',
      regex: /!\[(.*?)\]\(:?(.*?) '(.*?)'\)/g,
      replace:
        '<figure><img alt="$1" src="$2" title="$3" /><figcaption>$3</figcaption></figure>',
    },
    {
      type: 'lang',
      regex: /!\[(.*?)\]\(:?(.*?) '(.*?)' =(.*?)x(.*?)\)/g,
      replace:
        '<figure><img alt="$1" src="$2" title="$3" width="$4" height="$5" /><figcaption>$3</figcaption></figure>',
    },
  ],
  // metadata: true, // 解析不了yaml数组
  parseImgDimensions: true,
  openLinksInNewWindow: true,
  tables: true,
});

const inDir = path.join(process.cwd(), 'posts');
console.log('inDir', inDir);

const outDir = path.join(process.cwd(), __out_path__);
console.log('outDir', outDir);

// Clean Out Dir
fs.mkdirSync(outDir, { recursive: true });
fs.emptyDirSync(outDir);

// DB
const dbData = new DB();

// Deprecated: Copy CSS Assets
// Object.keys(styles).forEach((stylesheet) => {
//   const { src, desc } = styles[stylesheet];
//   fs.copySync(
//     path.join(process.cwd(), 'src', 'template', 'style-source', src),
//     path.join(outDir, desc)
//   );
// });
// console.log('CSS Assets Copied');
// CSS Assets Cache
const cssCache: { [key: string]: string } = {};
function getCSS(stylesheet: string): string {
  if (cssCache[stylesheet]) return cssCache[stylesheet];

  const cssPath = path.join(
    process.cwd(),
    'src',
    'template',
    'style-source',
    `${stylesheet}.css`
  );
  cssCache[stylesheet] = fs.readFileSync(cssPath, { encoding: 'UTF-8' });
  if (__production__) {
    cssCache[stylesheet] = cssCache[stylesheet]
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\n.*?(\S)/g, '$1');
  }
  return cssCache[stylesheet];
}

// Load Template
const tplPath = path.join(process.cwd(), __tpl_path__);
const tplContent = fs.readFileSync(tplPath, { encoding: 'UTF-8' });

const tplScriptPath = path.join(process.cwd(), __tpl_script_path__);
const tplScriptContent = fs.readFileSync(tplScriptPath, { encoding: 'UTF-8' });

const tplCSSPath = path.join(
  process.cwd(),
  'src',
  'template',
  'basic',
  'index.css'
);
const tplCSSContent = fs.readFileSync(tplCSSPath, { encoding: 'UTF-8' });
console.log('Template Loaded');

// Read Source Dir
const posts = fs.readdirSync(inDir);
console.log(posts);

// Copy Assets
posts
  .filter((file: string) => isDir(file))
  .forEach((dir: string) =>
    fs.copySync(path.join(inDir, dir), path.join(outDir, dir), {
      recursive: true,
    })
  );
console.log('All Assets Copied');

// Generate HTML
posts
  .filter((file: string) => isFile(file) && file.endsWith('.md'))
  .forEach((fileName: string) => {
    const fileContent = fs.readFileSync(path.join(inDir, fileName), {
      encoding: 'UTF-8',
    });

    const matches = fileContent.match(
      /^---\nstyle: (.*?)\ntitle: (.*?)\ndate: (.*?)\n(?:tags:.*?\n([\s\S]*?))?---\n([\s\S]*)$/
    );

    if (!matches) throw new Error(`文章[ ${fileName} ]头部信息解析出现错误！`);

    const [stylesheet, title, date, tags, content] = matches.slice(1);
    const tagsRe = /- (.*?)\n/g;
    const parsedTags = [];
    if (tags) {
      let tempTag;
      while ((tempTag = tagsRe.exec(tags))) {
        parsedTags.push(tempTag[1]);
      }
    }
    const body = converter.makeHtml(content);

    // converter.makeHtml(fileContent);
    // console.log(converter.getMetadata());

    console.log(
      [
        fileName,
        fileContent,
        stylesheet,
        title,
        date,
        tags,
        parsedTags,
        body,
      ].join('\n\n')
    );

    const name = fileName.substring(0, fileName.length - '.md'.length);
    dbData.add({ name, date, tags: parsedTags });

    const outFilePath = path.join(outDir, name + '.html');

    if (fs.existsSync(outFilePath)) fs.removeSync(outFilePath);
    fs.createFileSync(outFilePath);

    let cssStyles = tplCSSContent
      .replace('/* base_stylesheet */', getCSS(stylesheet))
      .replace('/* body_padding_0 */', getBodyPadding0(stylesheet))
      .replace('/* body_padding_1 */', getBodyPadding1(stylesheet));
    if (__production__) {
      cssStyles = cssStyles
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\n.*?(\S)/g, '$1');
    }

    fs.writeFileSync(
      outFilePath,
      tplContent
        .replace('<title />', title)
        .replace('/* stylesheet */', cssStyles)
        .replace('<body_title />', title)
        .replace('<body />', body)
        .replace('/* template.min.js */', tplScriptContent)
    );
  });
console.log('All HTML Generated');

const dbPath = path.join(outDir, 'db.json');
fs.createFileSync(dbPath);
fs.writeFileSync(dbPath, dbData.toString());
console.log('DB File Writen');
