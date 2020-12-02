import path from 'path';
import fs from 'fs-extra';
import jsYAML from 'js-yaml';

import {
  copyTemplateAssets,
  tplContent,
  tplScriptPath,
  fetchCSS,
  titleTag,
  dateTagHTML,
  titleTagHTML,
  emailLinkHTML,
  hmBaidu,
} from './template';
import {
  inDir,
  outDir,
  isAsset,
  isPost,
  preWrite,
  extractPostName,
} from './file';
import { htmlMinify } from './minify';
import { converter } from './converter';

// DB
import { DB } from '@common/db';
const dbData = new DB();

declare var __production__: boolean;

// Clean & Make Out Dir
fs.mkdirSync(outDir, { recursive: true });
console.log('inDir', inDir, '\noutDir', outDir, '\nready...');

// Read Source Dir
const sources = fs.readdirSync(inDir);
console.log('Sources:', sources);

// Copy Assets
copyTemplateAssets();
if (!__production__) {
  const assets = sources.filter((file: string) => isAsset(file));
  console.log('Assets:', assets);
  assets.forEach((dir: string) =>
    fs.copySync(path.join(inDir, dir), path.join(outDir, dir), {
      recursive: true,
    })
  );
  console.log('All Assets Copied');
}

// Generate HTML
const posts = sources.filter((file: string) => isPost(file));
console.log('Posts:', posts);
posts.forEach((fileName: string) => {
  const fileContent = fs.readFileSync(path.join(inDir, fileName), {
    encoding: 'UTF-8',
  });

  /**
   * moved deprecated code to ./_deprecated.ts
   * where implements metadata parsing
   */

  const body = converter.makeHtml(fileContent);
  const rawMetadata = converter.getMetadata(true) as string;
  let metadata: any;
  let tags = [];

  try {
    metadata = jsYAML.safeLoad(rawMetadata);
  } catch (e) {
    console.log(e);
  }

  const { 'no-receive-emails': noReceiveEmails, style, title, date } = metadata;
  if (titleTag(fileName)) tags.push(titleTag(fileName));
  if (metadata.tags) tags.push(...metadata.tags);

  console.log(
    'parsing------------------\n',
    [rawMetadata, noReceiveEmails, style, title, date, tags, body].join('\n\n'),
    '\n------------------parsing'
  );

  const name = extractPostName(fileName);
  dbData.add({ name, title, date, tags }).persist();
  preWrite(path.join(outDir, name + '.html')).writeFileSync(
    htmlMinify(
      tplContent
        .replace('{{title}}', title)
        .replace('{{article_title}}', title)
        .replace('{{javascript}}', tplScriptPath())
        .replace('{{hm_baidu}}', hmBaidu())
        .replace('{{stylesheet}}', fetchCSS(style))
        .replace('{{title_tag}}', titleTagHTML(fileName))
        .replace('{{date_tag}}', dateTagHTML(date))
        .replace(
          '{{article_body}}',
          `${body}${emailLinkHTML(fileName, noReceiveEmails, style, title)}`
        )
    )
  );
});
console.log('All HTMLs Generated');

const dbPath = path.join(outDir, 'db.json');
fs.createFileSync(dbPath);
fs.writeFileSync(dbPath, dbData.toString());
console.log('DB File Writen');
