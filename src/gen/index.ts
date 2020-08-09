import path from 'path';
import fs from 'fs-extra';
import showdown from 'showdown';

import styles from '@tpl/styles';
import { DB } from '@common/db';

declare var __posts_dir__: string;

// Construct Converter
const converter = new showdown.Converter();

const inDir = path.join(process.cwd(), 'posts');
console.log('inDir', inDir);

const outDir = path.join(process.cwd(), 'public', __posts_dir__);
console.log('outDir', outDir);

// Clean Out Dir
fs.mkdirSync(outDir, { recursive: true });
fs.emptyDirSync(outDir);

// DB
const dbData = new DB();

// Copy CSS Assets
Object.keys(styles).forEach((stylesheet) =>
  fs.copySync(
    path.join(process.cwd(), ...styles[stylesheet].src),
    path.join(outDir, styles[stylesheet].desc)
  )
);
console.log('CSS Assets Copied');

// Load Template
const tplPath = path.join(process.cwd(), 'src', 'tpl', 'basic', 'page.html');
const tplContent = fs.readFileSync(tplPath, { encoding: 'UTF-8' });
console.log('Template Loaded');

// Read Source Dir
const posts = fs.readdirSync(inDir);
console.log(posts);

// Copy Assets
posts
  .filter((file: string) => fs.statSync(path.join(inDir, file)).isDirectory())
  .forEach((dir: string) =>
    fs.copySync(path.join(inDir, dir), path.join(outDir, dir), {
      recursive: true,
    })
  );
console.log('All Assets Copied');

// Generate HTML
posts
  .filter(
    (file: string) =>
      fs.statSync(path.join(inDir, file)).isFile() && file.endsWith('.md')
  )
  .forEach((fileName: string) => {
    const fileContent = fs.readFileSync(path.join(inDir, fileName), {
      encoding: 'UTF-8',
    });

    const matches = fileContent.match(
      /^---\nstyle: (.*?)\ntitle: (.*?)\ndate: (.*?)\n(?:tags:.*?\n([\s\S]*?))?---\n([\s\S]*)$/
    );

    if (!matches) return;

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
        .replace('<stylesheet />', './' + styles[stylesheet].desc)
        .replace('<body_title />', title)
        .replace('<body_padding_0 />', stylesheet === 'github' ? 'padding: 45px' : '')
        .replace('<body_padding_1 />', stylesheet === 'github' ? 'padding: 15px' : '')
        // .replace('%body_date%', date)
        // .replace(/%year%/g, `${meta.date.year()}`)
        // .replace(/%month%/g, `${meta.date.month() + 1}`)
        // .replace(/%date%/g, `${meta.date.date()}`)
        .replace('<body />', body)
    );
  });
console.log('All HTML Generated');

const dbPath = path.join(outDir, 'db.json');
fs.createFileSync(dbPath);
fs.writeFileSync(dbPath, dbData.toString());
console.log('DB File Writen');
