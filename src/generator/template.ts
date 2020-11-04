import '@common/shims-string';

import path from 'path';
import fs from 'fs-extra';

import Sheets from '@tpl/styles';

import { outDir, preWrite } from './file';
import { minify } from './minify';
import argv from './yargs';

declare var __production__: boolean;
declare var __resources_dir__: string;
// console.log('---------->', __resources_dir__);

// Locate Template Script Path
export function tplScriptPath(): string {
  return (
    fs
      .readdirSync(argv.tplDir)
      .find(
        (asset: string) =>
          asset.startsWith('template.') && asset.endsWith('.js')
      ) || 'template.min.js'
  );
}

// Copy Template Assets
export function copyTemplateAssets() {
  const assets = fs.readdirSync(argv.tplDir);
  console.log('template assets dir:', assets);

  assets.forEach((asset: string) => {
    if (asset === 'generator.min.js') return;

    fs.copyFileSync(path.join(argv.tplDir, asset), path.join(outDir, asset));
  });
}

// CSS Assets Maps
const tplCSSPath = path.join(process.cwd(), argv.cssPath);
const tplCSSContent = fs.readFileSync(tplCSSPath, { encoding: 'UTF-8' });

const CSSMaps: {
  [key: string]: string;
} = {};

export function fetchCSS(base: string): string {
  if (CSSMaps[base]) return CSSMaps[base];

  const baseCSSPath = path.join(
    process.cwd(),
    `src/template/styles/${base}.css`
  );

  const baseCSSContent = fs.readFileSync(baseCSSPath, {
    encoding: 'UTF-8',
  });

  const cssContent = minify(
    tplCSSContent
      .replace('/* base_stylesheet */', baseCSSContent)
      .replace('/* body_padding_pc */', Sheets[base].padding.pc)
      .replace('/* body_padding_mobile */', Sheets[base].padding.mobile)
      .replace(/\/\* reources_dir \*\//g, __resources_dir__)
  );

  CSSMaps[base] = cssContent.md5(base, 'css', 10);

  preWrite(path.join(outDir, CSSMaps[base])).writeFileSync(cssContent);

  return CSSMaps[base];
}

// Load Template
const tplPath = path.join(process.cwd(), argv.tplPath);
export const tplContent = fs.readFileSync(tplPath, { encoding: 'UTF-8' });

// titleTag
export function titleTag(fileName: string): string {
  if (fileName.startsWith('private-'))
    return '<blockquote><code>-> 隐私 <-</code></blockquote>';
  if (fileName.startsWith('draft-'))
    return '<blockquote><code>-> 草稿 <-</code></blockquote>';
  return '';
}

// dateTag
export function dateTag(date: string): string {
  return `<code> ~~ 更新于 -> ${date}</code>`;
}

// hm baidu
export function hmBaidu(): string {
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

// email link
export function emailLink(
  fileName: string,
  noReceiveEmails: string,
  style: string,
  title: string
): string {
  if (
    noReceiveEmails ||
    fileName.startsWith('private-') // ||
    // notCompetibleForReceivingEmails(style)
  )
    return '';

  return `
<br /><br />
<hr />
<br />
<div class="comments">
<a href="mailto:954382491@qq.com?subject=评价「${title}」">发邮件~来评价~一下吧</a>
<h6 class="tip">⚠️ 请先安装一款邮件软件（部分浏览器可能不支持，请使用设备默认浏览器打开本页面）</h6>
</div>
<br />
  `;
}
