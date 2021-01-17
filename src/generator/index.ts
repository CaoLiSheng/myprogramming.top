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
import { inDir, outDir, isPost, preWrite, extractPostName } from './file';
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

// Copy Template's Assets
copyTemplateAssets();

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
  const matches = fileContent.match(/^[\s\S]*?---\n([\s\S]*?)---\n([\s\S]*)$/);
  if (!matches) throw new Error(`文章[ ${fileName} ]头部信息解析出现错误！`);
  const [rawMetadata, mdContent] = matches.slice(1);
  const body = converter.render(mdContent);

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
    'parsing-------------start\n',
    [rawMetadata, noReceiveEmails, style, title, date, tags, body].join('\n\n'),
    '\nend---------------parsing'
  );

  const name = extractPostName(fileName);
  const rowMeta = dbData.add({ name, title, date, tags }).persist();
  preWrite(path.join(outDir, name + '.html')).writeFileSync(
    htmlMinify(
      tplContent
        .replace('{{title}}', title + ' | 又心真人的博客')
        .replace('{{article_title}}', title)
        .replace('{{javascript}}', tplScriptPath())
        .replace('{{hm_baidu}}', hmBaidu())
        .replace('{{stylesheet}}', fetchCSS(style))
        .replace('{{title_tag}}', titleTagHTML(fileName))
        .replace('{{date_tag}}', dateTagHTML(date, !rowMeta))
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
