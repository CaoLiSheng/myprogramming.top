// Deprecated: Copy CSS Assets
// Object.keys(styles).forEach((stylesheet) => {
//   const { src, desc } = styles[stylesheet];
//   fs.copySync(
//     path.join(process.cwd(), 'src', 'template', 'style-source', src),
//     path.join(outDir, desc)
//   );
// });
// console.log('CSS Assets Copied');

import path from 'path';
import fs from 'fs-extra';
import md5 from 'md5';

import Sheets from '@tpl/styles';

import { outDir, preWrite } from './file';
import { minify } from './minify';

declare var __tpl_assets_dir__: string;
declare var __production__: boolean;

// Locate Template Script Path
export const tplScriptPath: string =
  fs
    .readdirSync(__tpl_assets_dir__)
    .find(
      (asset: string) => asset.startsWith('template.') && asset.endsWith('.js')
    ) || 'template.min.js';

// Copy Template Assets
export function copyTemplateAssets() {
  const assets = fs.readdirSync(__tpl_assets_dir__);
  console.log('template assets dir:', assets);

  assets.forEach((asset: string) => {
    if (asset === 'generator.min.js') return;

    fs.copyFileSync(
      path.join(__tpl_assets_dir__, asset),
      path.join(outDir, asset)
    );
  });
}

// CSS Assets Maps
const tplCSSPath = path.join(
  process.cwd(),
  'src',
  'template',
  'basic',
  'index.css'
);
const tplCSSContent = fs.readFileSync(tplCSSPath, { encoding: 'UTF-8' });

const CSSMaps: {
  [key: string]: string;
} = {};

export function fetchCSS(base: string): string {
  if (CSSMaps[base]) return CSSMaps[base];

  const baseCSSPath = path.join(
    process.cwd(),
    'src',
    'template',
    'style-source',
    `${base}.css`
  );

  const baseCSSContent = fs.readFileSync(baseCSSPath, {
    encoding: 'UTF-8',
  });

  const cssContent = minify(
    tplCSSContent
      .replace('/* base_stylesheet */', baseCSSContent)
      .replace('/* body_padding_pc */', Sheets[base].padding.pc)
      .replace('/* body_padding_mobile */', Sheets[base].padding.mobile)
  );

  CSSMaps[base] = `${base}.${md5(cssContent).substring(0, 20)}.css`;

  preWrite(path.join(outDir, CSSMaps[base])).writeFileSync(cssContent);

  return CSSMaps[base];
}

// Load Template
const tplPath = path.join(
  process.cwd(),
  'src',
  'template',
  'basic',
  'index.html'
);
export const tplContent = fs.readFileSync(tplPath, { encoding: 'UTF-8' });

// preTitle
export function preTitle(fileName: string): string {
  if (fileName.startsWith('private-')) return '「隐私」';
  if (fileName.startsWith('draft-')) return '「草稿」';
  return '';
}

// dateTag
export function dateTag(date: string): string {
  return `<code> ~~ 更新时间 -> ${date}</code>`;
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
  title: string
): string {
  if (noReceiveEmails || fileName.startsWith('private-')) return '';

  return `
<br /><br />
<hr />
<br />
<div class="comments">
<a href="mailto:954382491@qq.com?subject=评价「${title}」">发邮件~来评价~一下吧</a>
<h6 class="tip">请先安装一款邮件软件（部分浏览器可能不支持，请使用设备默认浏览器打开本页面）</h6>
</div>
<br />
  `;
}
