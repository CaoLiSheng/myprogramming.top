import '@common/shims-string';

import path from 'path';

// import Sheets from '@tpl/styles';
import fs from 'fs-extra';

// import { outDir } from './file';
// import { minify } from './minify';
import argv from './yargs';

declare let __production__: boolean;
// declare let __resource_dir__: string;

// Locate Template Script Path
// export function tplScriptPath (): string {
//   return (
//     fs
//       .readdirSync ( argv.tplDir )
//       .find (
//         ( asset: string ) => asset.startsWith ( 'template.' ) && asset.endsWith ( '.js' ),
//       ) || 'template.min.js'
//   );
// }

// CSS Assets Maps
// const tplCSSPath = path.join ( process.cwd (), argv.cssPath );
// const tplCSSContent = fs.readFileSync ( tplCSSPath, { encoding: 'UTF-8' } );

// const CSSMaps: {
//   [key: string]: string;
// } = {};

// function fetchCSSCache (
//   name: string,
//   callback: ( name: string ) => string,
// ): string {
//   if ( CSSMaps[name] ) return CSSMaps[name];
//   const res: string = callback ( name );
//   CSSMaps[name] = res;
//   return res;
// }

// function fetchCommonCSS ( partial: string ): string {
//   const partialCSSPath = path.join (
//     process.cwd (),
//     `src/template/common/${ partial }`,
//   );

//   return fs.readFileSync ( partialCSSPath, {
//     encoding: 'UTF-8',
//   } );
// }

// function fetchCSSImpl ( base: string ): string {
//   const baseCSSPath = path.join (
//     process.cwd (),
//     `src/template/styles/${ base }.css`,
//   );

//   const baseCSSContent = fs.readFileSync ( baseCSSPath, {
//     encoding: 'UTF-8',
//   } );

//   const cssContent = minify (
//     tplCSSContent
//       .replace ( '/* base_stylesheet */', baseCSSContent )
//       .replace ( '/* body_padding_pc */', Sheets[base].padding.pc )
//       .replace ( '/* body_padding_mobile */', Sheets[base].padding.mobile )
//       .replace ( /\/\* common\/(.*?) \*\//g, ( _: string, partial: string ) => fetchCSSCache ( partial, fetchCommonCSS ) )
//       .replace ( /{{resource_dir}}/g, __resource_dir__ )
//   );

//   const fileName = cssContent.md5 ( base, 'css', 10 );

//   fs.writeFileSync ( path.join ( outDir, fileName ), cssContent, {
//     encoding: 'UTF-8',
//     flag    : 'w',
//   } );

//   return fileName;
// }

// export function fetchCSS ( base: string ): string {
//   return fetchCSSCache ( base, fetchCSSImpl );
// }

// Load Template
const tplPath = path.join ( process.cwd (), argv.tplPath );
export const tplContent = fs.readFileSync ( tplPath, { encoding: 'UTF-8' } );

// titleTag
export function titleTag ( fileName: string ): string {
  if ( fileName.startsWith ( '=' ) ) return '???';
  if ( fileName.startsWith ( 'draft-' ) ) return '??????';
  if ( fileName.startsWith ( 'private-' ) ) return '??????';
  return '';
}

export function titleTagHTML ( fileName: string ): string {
  const tag = titleTag ( fileName );
  if ( !tag ) return '';

  return `<blockquote><code>-> ${ tag } <-</code></blockquote>`;
}

// dateTag
export function dateTagHTML ( date: string, raw = false ): string {
  return `<code> ~-~> ${ raw ? date : date.slice ( 0, 10 ) }</code>`;
}

// hm baidu
export function hmBaidu (): string {
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
export function emailLinkHTML (
  fileName: string,
  noReceiveEmails: string,
  style: string,
  title: string,
): string {
  if (
    noReceiveEmails
    || fileName.startsWith ( 'private-' ) // ||
    // notCompetibleForReceivingEmails(style)
  ) return '';

  return `
<br /><br />
<hr />
<br />
<div class="comments">
<a href="mailto:954382491@qq.com?subject=?????????${ title }???">??????????????????</a>
<h6 class="tip">?????? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????</h6>
</div>
<br />
  `;
}
