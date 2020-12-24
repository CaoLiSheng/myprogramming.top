import showdown from 'showdown';

declare var __resources_dir__: string;

const ext_figure_caption_size = {
  type: 'lang',
  regex: /!\[(.*?)\]\((\S+?) ['"]:(.*?)=(\S*?)-(\S*?)['"]\)/g,
  replace: function(
    _: string,
    $1: string,
    $2: string,
    $3: string,
    $4: string,
    $5: string
  ): string {
    return `<figure><div class="image" style=" height: ${$5 || 'auto'};">
        <img alt="${$1}" width="${$4 || 'auto'}" height="auto"
        src="${__resources_dir__}${$2}" title="${$3}" />
      </div><figcaption>${$3}</figcaption></figure>`;
  },
};

const ext_figure_caption_size_scroll = {
  type: 'lang',
  regex: /!\[(.*?)\]\((\S+?) ['"]:(.*?)=(\S*?)-(\S*?)-(\S*?)-(\S*?)['"]\)/g,
  replace: function(
    _: string,
    $1: string,
    $2: string,
    $3: string,
    $4: string,
    $5: string,
    $6: string,
    $7: string
  ): string {
    return `<figure><div class="image" style=" height: ${$5 || 'auto'};"
    data-scroll-x="${$6 || 0}" data-scroll-y="${$7 || 0}">
        <img alt="${$1}" width="${$4 || 'auto'}" height="auto"
        src="${__resources_dir__}${$2}" title="${$3}" />
      </div><figcaption>${$3}</figcaption></figure>`;
  },
};

const ext_figure_caption = {
  type: 'lang',
  regex: /!\[(.*?)\]\((\S+?) ['"]:(.*?)['"]\)/g,
  replace: function(): string {
    return `<figure><img alt="$1" src="${__resources_dir__}$2" title="$3" /><figcaption>$3</figcaption></figure>`;
  },
};

const ext_img_size = {
  type: 'lang',
  regex: /!!\[(.*?)\]\((\S+?) ['"]=(\S*?)-(\S*?)['"]\)/g,
  replace: function(
    _: string,
    $1: string,
    $2: string,
    $3: string,
    $4: string
  ): string {
    return `<img alt="${$1}" src="${__resources_dir__}${$2}" title="${$1}" width="${$3 ||
      'auto'}" height="${$4 || 'auto'}" />`;
  },
};

const ext_figure_size_scroll = {
  type: 'lang',
  regex: /!\[(.*?)\]\((\S+?) ['"]=(\S*?)-(\S*?)-(\S*?)-(\S*?)['"]\)/g,
  replace: function(
    _: string,
    $1: string,
    $2: string,
    $3: string,
    $4: string,
    $5: string,
    $6: string
  ): string {
    return `<figure><div class="image" style=" height: ${$4 || 'auto'};"
      data-scroll-x="${$5 || 0}" data-scroll-y="${$6 || 0}">
        <img alt="${$1}" width="${$3 || 'auto'}" height="auto"
        src="${__resources_dir__}${$2}" title="${$1}" />
      </div><figcaption>${$1}</figcaption></figure>`;
  },
};

const ext_figure_size = {
  type: 'lang',
  regex: /!\[(.*?)\]\((\S+?) ['"]=(\S*?)-(\S*?)['"]\)/g,
  replace: function(
    _: string,
    $1: string,
    $2: string,
    $3: string,
    $4: string
  ): string {
    return `<figure><div class="image" style=" height: ${$4 || 'auto'};">
        <img alt="${$1}" width="${$3 || 'auto'}" height="auto"
        src="${__resources_dir__}${$2}" title="${$1}" />
      </div><figcaption>${$1}</figcaption></figure>`;
  },
};

const ext_img = {
  type: 'lang',
  regex: /!!\[(.*?)\]\((\S+?)\)/g,
  replace: `<img alt="$1" src="${__resources_dir__}$2" title="$1" />`,
};

const ext_figure = {
  type: 'lang',
  regex: /!\[(.*?)\]\((\S+?)\)/g,
  replace: `<figure><img alt="$1" src="${__resources_dir__}$2" title="$1" /><figcaption>$1</figcaption></figure>`,
};

const ext_download_link = {
  type: 'lang',
  regex: /\[(.*?)\]\((\S+?) ['"](.*?)['"]\)/g,
  replace: `<a href="${__resources_dir__}$2" download="$3">点击下载「$1」</a>`,
};

export const converter = new showdown.Converter({
  extensions: [
    ext_figure_caption_size_scroll,
    ext_figure_caption_size,
    ext_figure_caption,
    ext_img_size,
    ext_figure_size_scroll,
    ext_figure_size,
    ext_img,
    ext_figure,
    ext_download_link,
  ],
  // openLinksInNewWindow: true, // 做下载链接时遇到了一点bug，所以自己加了一个插件
  metadata: true, // 解析不了yaml数组，所以取raw数据，用jsYAML解析
  disableForced4SpacesIndentedSublists: true,
  parseImgDimensions: true,
  rawHeaderId: true,
  tables: true,
});
