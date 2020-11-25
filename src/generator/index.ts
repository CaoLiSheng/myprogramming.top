import path from 'path';
import fs from 'fs-extra';

import {
  tplContent,
  tplScriptPath,
  copyTemplateAssets,
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
import { converter } from './converter';
import { htmlMinify } from './minify';

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

  const matches = fileContent.match(
    /^---\n(no-receive-emails\n)?style: (.*?)\ntitle: (.*?)\ndate: (.*?)\n(?:tags:.*?\n([\s\S]*?))?---\n([\s\S]*)$/
  );

  if (!matches) throw new Error(`文章[ ${fileName} ]头部信息解析出现错误！`);

  const [
    noReceiveEmails,
    stylesheet,
    title,
    date,
    tags,
    content,
  ] = matches.slice(1);
  const tagsRe = /- (.*?)\n/g;
  const parsedTags = [titleTag(fileName)].filter((t: string) => !!t.trim());
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
      noReceiveEmails,
      stylesheet,
      title,
      date,
      tags,
      parsedTags,
      body,
    ].join('\n\n')
  );

  const name = extractPostName(fileName);
  dbData.add({ name, title, date, tags: parsedTags }).persist();
  preWrite(path.join(outDir, name + '.html')).writeFileSync(
    htmlMinify(
      tplContent
        .replace('{{title}}', title)
        .replace('{{article_title}}', title)
        .replace('{{javascript}}', tplScriptPath())
        .replace('{{hm_baidu}}', hmBaidu())
        .replace('{{stylesheet}}', fetchCSS(stylesheet))
        .replace('{{title_tag}}', titleTagHTML(fileName))
        .replace('{{date_tag}}', dateTagHTML(date))
        .replace(
          '{{article_body}}',
          `${body}${emailLinkHTML(
            fileName,
            noReceiveEmails,
            stylesheet,
            title
          )}`
        )
    )
  );
});
console.log('All HTMLs Generated');

const dbPath = path.join(outDir, 'db.json');
fs.createFileSync(dbPath);
fs.writeFileSync(dbPath, dbData.toString());
console.log('DB File Writen');
