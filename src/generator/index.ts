import path from 'path';
import fs from 'fs-extra';
import showdown from 'showdown';
import md5 from 'md5';

import Sheets from '@tpl/styles';
import { DB } from '@common/db';

declare var __out_path__: string;
declare var __production__: boolean;
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
      regex: /!\[(.*?)\]\(:?(.*?) '(.*?)' =(.*?)-(.*?)\)/g,
      replace:
        '<figure><img alt="$1" src="$2" title="$3" width="$4" height="$5" /><figcaption>$3</figcaption></figure>',
    },
    {
      type: 'lang',
      regex: /\[(.*?)\]\(:?(.*?) '(.*?)'\)/g,
      replace: '<a href="$2" download="$3">点击下载「$1」</a>',
    },
  ],
  // metadata: true, // 解析不了yaml数组
  disableForced4SpacesIndentedSublists: true,
  // openLinksInNewWindow: true,
  parseImgDimensions: true,
  tables: true,
});

const inDir = path.join(process.cwd(), 'posts');
console.log('inDir', inDir);

const outDir = path.join(process.cwd(), __out_path__);
console.log('outDir', outDir);

// Clean & Make Out Dir
fs.emptyDirSync(outDir);
fs.mkdirSync(outDir, { recursive: true });

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

// Load Template
const tplPath = path.join(
  process.cwd(),
  'src',
  'template',
  'basic',
  'index.html'
);
const tplContent = fs.readFileSync(tplPath, { encoding: 'UTF-8' });

const tplScriptPath = path.join(process.cwd(), __tpl_script_path__);
const tplScriptContent = fs.readFileSync(tplScriptPath, { encoding: 'UTF-8' });
const tplScriptName = `template.${md5(tplScriptContent).substring(0, 20)}.js`;
fs.copySync(tplScriptPath, path.join(outDir, tplScriptName));

const tplCSSPath = path.join(
  process.cwd(),
  'src',
  'template',
  'basic',
  'index.css'
);
const tplCSSContent = fs.readFileSync(tplCSSPath, { encoding: 'UTF-8' });
console.log('Template Loaded');

// CSS Assets Maps
const CSSMaps: {
  [key: string]: string;
} = {};

function fetchCSS(base: string): string {
  if (CSSMaps[base]) return CSSMaps[base];

  const baseCSSPath = path.join(
    process.cwd(),
    'src',
    'template',
    'style-source',
    `${base}.css`
  );

  const baseCSSContent = cssMinify(
    fs.readFileSync(baseCSSPath, {
      encoding: 'UTF-8',
    })
  );

  const cssContent = cssMinify(
    tplCSSContent
      .replace('/* base_stylesheet */', baseCSSContent)
      .replace('/* body_padding_pc */', Sheets[base].padding.pc)
      .replace('/* body_padding_mobile */', Sheets[base].padding.mobile)
  );

  CSSMaps[base] = `${base}.${md5(cssContent).substring(0, 20)}.css`;

  const outFilePath = path.join(outDir, CSSMaps[base]);
  if (fs.existsSync(outFilePath)) fs.removeSync(outFilePath);
  fs.createFileSync(outFilePath);
  fs.writeFileSync(outFilePath, cssContent);

  return CSSMaps[base];
}

function cssMinify(css: string): string {
  if (__production__) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\n+.*?(\S)/g, '$1')
      .trim();
  }
  return css;
}

// hm baidu
function hmBaidu(): string {
  return __production__
    ? `
<script>
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?f402a68d651d46513a3688a8d07eb93c';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();
</script>
  `
    : '';
}

// Read Source Dir
const posts = fs.readdirSync(inDir);
console.log(posts);

// Copy Assets
posts
  .filter((file: string) => !file.endsWith('.resource') && isDir(file))
  .forEach((dir: string) =>
    fs.copySync(path.join(inDir, dir), path.join(outDir, dir), {
      recursive: true,
    })
  );
console.log('All Assets Copied');

// Generate HTML
posts
  .filter((file: string) => file.endsWith('.md') && isFile(file))
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

    fs.writeFileSync(
      outFilePath,
      tplContent
        .replace('<title />', title)
        .replace('<hm_baidu />', hmBaidu())
        .replace('/* stylesheet */', fetchCSS(stylesheet))
        .replace('<body_title />', title)
        .replace('<body />', body)
        .replace('/* javascript */', tplScriptName)
    );
  });
console.log('All HTML Generated');

const dbPath = path.join(outDir, 'db.json');
fs.createFileSync(dbPath);
fs.writeFileSync(dbPath, dbData.toString());
console.log('DB File Writen');
