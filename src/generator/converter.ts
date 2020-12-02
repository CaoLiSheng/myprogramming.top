import showdown from 'showdown';

declare var __resources_dir__: string;

export const converter = new showdown.Converter({
  extensions: [
    {
      type: 'lang',
      regex: /!\[(.*?)\]\((\S+?) ':(.*?)=(\S*?)-(\S*?)'\)/g,
      replace: (
        _: string,
        $1: string,
        $2: string,
        $3: string,
        $4: string,
        $5: string
      ) =>
        `<figure><div class="image" style="overflow: auto; width: 100%; height: ${$5 ||
          'auto'};"><img alt="${$1}" src="${__resources_dir__}${$2}" title="${$3}" width="${$4 ||
          'auto'}" height="auto" style="max-width: unset;" /></div><figcaption>${$3}</figcaption></figure>`,
    },
    {
      type: 'lang',
      regex: /!\[(.*?)\]\((\S+?) ':(.*?)'\)/g,
      replace: `<figure><img alt="$1" src="${__resources_dir__}$2" title="$3" /><figcaption>$3</figcaption></figure>`,
    },
    {
      type: 'lang',
      regex: /!!\[(.*?)\]\((\S+?) '=(\S*?)-(\S*?)'\)/g,
      replace: (_: string, $1: string, $2: string, $3: string, $4: string) =>
        `<img alt="${$1}" src="${__resources_dir__}${$2}" title="${$1}" width="${$3 ||
          'auto'}" height="${$4 || 'auto'}" />`,
    },
    {
      type: 'lang',
      regex: /!\[(.*?)\]\((\S+?) '=(\S*?)-(\S*?)'\)/g,
      replace: (_: string, $1: string, $2: string, $3: string, $4: string) =>
        `<figure><div class="image" style="overflow: auto; width: 100%; height: ${$4 ||
          'auto'};"><img alt="${$1}" src="${__resources_dir__}${$2}" title="${$1}" width="${$3 ||
          'auto'}" height="auto" style="max-width: unset;" /></div><figcaption>${$1}</figcaption></figure>`,
    },
    {
      type: 'lang',
      regex: /!!\[(.*?)\]\((\S+?)\)/g,
      replace: `<img alt="$1" src="${__resources_dir__}$2" title="$1" />`,
    },
    {
      type: 'lang',
      regex: /!\[(.*?)\]\((\S+?)\)/g,
      replace: `<figure><img alt="$1" src="${__resources_dir__}$2" title="$1" /><figcaption>$1</figcaption></figure>`,
    },
    {
      type: 'lang',
      regex: /\[(.*?)\]\((\S+?) '(.*?)'\)/g,
      replace: `<a href="${__resources_dir__}$2" download="$3">点击下载「$1」</a>`,
    },
    {
      type: 'lang',
      regex: /~~(.+?)~~/g,
      replace: '<s>$1</s>',
    },
  ],
  metadata: true, // 解析不了yaml数组
  // openLinksInNewWindow: true, // 做下载链接时遇到了一点bug，所以自己加了一个插件
  disableForced4SpacesIndentedSublists: true,
  parseImgDimensions: true,
  rawHeaderId: true,
  tables: true,
});
