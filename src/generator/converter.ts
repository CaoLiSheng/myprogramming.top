import showdown from 'showdown';

export const converter = new showdown.Converter({
  extensions: [
    {
      type: 'lang',
      regex: /!\[(.*?)\]\(:?([\S]+)\)/g,
      replace:
        '<figure><img alt="$1" src="$2" title="$1" /><figcaption>$1</figcaption></figure>',
    },
    {
      type: 'lang',
      regex: /!\[(.*?)\]\(:?(.*?) =(.*?)-(.*?)\)/g,
      replace:
        '<figure><img alt="$1" src="$2" title="$1" width="$3" height="$4" /><figcaption>$1</figcaption></figure>',
    },
    {
      type: 'lang',
      regex: /!\[(.*?)\]\(:?(.*?) '(.*?)'\)/g,
      replace:
        '<figure><img alt="$1" src="$2" title="$3" /><figcaption>$3</figcaption></figure>',
    },
    {
      type: 'lang',
      regex: /!\[(.*?)\]\(:?(.*?) '(.*?)' =(.*?)-(.*?)\)/g,
      replace:
        '<figure><img alt="$1" src="$2" title="$3" width="$4" height="$5" /><figcaption>$3</figcaption></figure>',
    },
    {
      type: 'lang',
      regex: /\[(.*?)\]\(:?(.*?) '(.*?)'\)/g,
      replace: '<a href="$2" download="$3">点击下载「$1」</a>',
    },
  ],
  // metadata: true, // 解析不了yaml数组
  // openLinksInNewWindow: true, // 做下载链接时遇到了一点bug，所以自己加了一个插件
  disableForced4SpacesIndentedSublists: true,
  parseImgDimensions: true,
  tables: true,
});
