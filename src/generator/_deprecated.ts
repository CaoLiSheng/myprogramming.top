// const matches = fileContent.match(
//   /^---\n(no-receive-emails\n)?style: (.*?)\ntitle: (.*?)\ndate: (.*?)\n(?:tags:.*?\n([\s\S]*?))?---\n([\s\S]*)$/
// );

// if (!matches) throw new Error(`文章[ ${fileName} ]头部信息解析出现错误！`);

// const [
//   noReceiveEmails,
//   stylesheet,
//   title,
//   date,
//   tags,
//   // content,
// ] = matches.slice(1);
// const tagsRe = /- (.*?)\n/g;
// const parsedTags = [titleTag(fileName)].filter((t: string) => !!t.trim());
// if (tags) {
//   let tempTag;
//   while ((tempTag = tagsRe.exec(tags))) {
//     parsedTags.push(tempTag[1]);
//   }
// }
// const body = converter.makeHtml(content);
// console.log(
//   [
//     fileName,
//     fileContent,
//     noReceiveEmails,
//     stylesheet,
//     title,
//     date,
//     tags,
//     parsedTags,
//     body,
//   ].join('\n\n')
// );

// ===================================
// import showdown from 'showdown';

// declare var __resource_dir__: string;

// const ext_figure_caption_size = {
//   type: 'lang',
//   regex: /!\[(.*?)\]\((\S+?) ['"]:(.*?)=(\S*?)-(\S*?)['"]\)/g,
//   replace: function(
//     _: string,
//     $1: string,
//     $2: string,
//     $3: string,
//     $4: string,
//     $5: string
//   ): string {
//     return `<figure><div class="image" style=" height: ${$5 || 'auto'};">
//         <img alt="${$1}" width="${$4 || 'auto'}" height="auto"
//         src="${__resource_dir__}${$2}" title="${$3}" />
//       </div><figcaption>${$3}</figcaption></figure>`;
//   },
// };

// const ext_figure_caption_size_scroll = {
//   type: 'lang',
//   regex: /!\[(.*?)\]\((\S+?) ['"]:(.*?)=(\S*?)-(\S*?)-(\S*?)-(\S*?)['"]\)/g,
//   replace: function(
//     _: string,
//     $1: string,
//     $2: string,
//     $3: string,
//     $4: string,
//     $5: string,
//     $6: string,
//     $7: string
//   ): string {
// return `<figure><div class="image" style=" height: ${$5 || 'auto'};"
// data-scroll-x="${$6 || 0}" data-scroll-y="${$7 || 0}">
//     <img alt="${$1}" width="${$4 || 'auto'}" height="auto"
//     src="${__resource_dir__}${$2}" title="${$3}" />
//   </div><figcaption>${$3}</figcaption></figure>`;
//   },
// };

// const ext_figure_caption = {
//   type: 'lang',
//   regex: /!\[(.*?)\]\((\S+?) ['"]:(.*?)['"]\)/g,
//   replace: function(): string {
//     return `<figure><img alt="$1" src="${__resource_dir__}$2" title="$3" /><figcaption>$3</figcaption></figure>`;
//   },
// };

// const ext_img_size = {
//   type: 'lang',
//   regex: /!!\[(.*?)\]\((\S+?) ['"]=(\S*?)-(\S*?)['"]\)/g,
//   replace: function(
//     _: string,
//     $1: string,
//     $2: string,
//     $3: string,
//     $4: string
//   ): string {
//     return `<img alt="${$1}" src="${__resource_dir__}${$2}" title="${$1}" width="${$3 ||
//       'auto'}" height="${$4 || 'auto'}" />`;
//   },
// };

// const ext_figure_size_scroll = {
//   type: 'lang',
//   regex: /!\[(.*?)\]\((\S+?) ['"]=(\S*?)-(\S*?)-(\S*?)-(\S*?)['"]\)/g,
//   replace: function(
//     _: string,
//     $1: string,
//     $2: string,
//     $3: string,
//     $4: string,
//     $5: string,
//     $6: string
//   ): string {
//     return `<figure><div class="image" style=" height: ${$4 || 'auto'};"
//       data-scroll-x="${$5 || 0}" data-scroll-y="${$6 || 0}">
//         <img alt="${$1}" width="${$3 || 'auto'}" height="auto"
//         src="${__resource_dir__}${$2}" title="${$1}" />
//       </div><figcaption>${$1}</figcaption></figure>`;
//   },
// };

// const ext_figure_size = {
//   type: 'lang',
//   regex: /!\[(.*?)\]\((\S+?) ['"]=(\S*?)-(\S*?)['"]\)/g,
//   replace: function(
//     _: string,
//     $1: string,
//     $2: string,
//     $3: string,
//     $4: string
//   ): string {
//     return `<figure><div class="image" style=" height: ${$4 || 'auto'};">
//         <img alt="${$1}" width="${$3 || 'auto'}" height="auto"
//         src="${__resource_dir__}${$2}" title="${$1}" />
//       </div><figcaption>${$1}</figcaption></figure>`;
//   },
// };

// const ext_img = {
//   type: 'lang',
//   regex: /!!\[(.*?)\]\((\S+?)\)/g,
//   replace: `<img alt="$1" src="${__resource_dir__}$2" title="$1" />`,
// };

// const ext_figure = {
//   type: 'lang',
//   regex: /!\[(.*?)\]\((\S+?)\)/g,
//   replace: `<figure><img alt="$1" src="${__resource_dir__}$2" title="$1" /><figcaption>$1</figcaption></figure>`,
// };

// const ext_download_link = {
//   type: 'lang',
//   regex: /\[(.*?)\]\((\S+?) ['"](.*?)['"]\)/g,
//   replace: `<a href="${__resource_dir__}$2" download="$3">点击下载「$1」</a>`,
// };

// export const converter = new showdown.Converter({
//   extensions: [
//     ext_figure_caption_size_scroll,
//     ext_figure_caption_size,
//     ext_figure_caption,
//     ext_img_size,
//     ext_figure_size_scroll,
//     ext_figure_size,
//     ext_img,
//     ext_figure,
//     ext_download_link,
//   ],
//   // openLinksInNewWindow: true, // 做下载链接时遇到了一点bug，所以自己加了一个插件
//   metadata: true, // 解析不了yaml数组，所以取raw数据，用jsYAML解析
//   disableForced4SpacesIndentedSublists: true,
//   parseImgDimensions: true,
//   rawHeaderId: true,
//   tables: true,
// });

// ==============================
// pre write: do some cleaning
// type WriteFileOptions =
//   | string
//   | {
//       encoding?: string | null | undefined;
//       mode?: string | number | undefined;
//       flag?: string | undefined;
//     }
//   | null
//   | undefined;

// export function preWrite(
//   file: string
// ): {
//   writeFileSync: (data: any, options?: WriteFileOptions) => void;
// } {
//   if (fs.existsSync(file)) fs.removeSync(file);
//   fs.createFileSync(file);
//   return {
//     writeFileSync: (data: any, options?: WriteFileOptions) =>
//       fs.writeFileSync(file, data, options),
//   };
// }
