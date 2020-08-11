export default {
  github: {
    src: ['src', 'tpl', 'style-source', 'github.css'],
    desc: 'github.css',
  },
  splendor: {
    src: ['src', 'tpl', 'style-source', 'splendor.css'],
    desc: 'splendor.css',
  },
  air: {
    src: ['src', 'tpl', 'style-source', 'air.css'],
    desc: 'air.css',
  },
  retro: {
    src: ['src', 'tpl', 'style-source', 'retro.css'],
    desc: 'retro.css',
  },
  modest: {
    src: ['src', 'tpl', 'style-source', 'modest.css'],
    desc: 'modest.css',
  },
  amblin: {
    src: ['src', 'tpl', 'style-source', 'amblin.css'],
    desc: 'amblin.css',
  },
  apollo: {
    src: ['src', 'tpl', 'style-source', 'apollo.css'],
    desc: 'apollo.css',
  },
  erye: {
    src: ['src', 'tpl', 'style-source', 'erye.css'],
    desc: 'erye.css',
  },
  infoq: {
    src: ['src', 'tpl', 'style-source', 'infoq.css'],
    desc: 'infoq.css',
  },
  less: {
    src: ['src', 'tpl', 'style-source', 'less.css'],
    desc: 'less.css',
  },
  'list-writing': {
    src: ['src', 'tpl', 'style-source', 'list-writing.css'],
    desc: 'list-writing.css',
  },
  ocean: {
    src: ['src', 'tpl', 'style-source', 'ocean.css'],
    desc: 'ocean.css',
  },
  sanyuesha: {
    src: ['src', 'tpl', 'style-source', 'sanyuesha.css'],
    desc: 'sanyuesha.css',
  },
  simple: {
    src: ['src', 'tpl', 'style-source', 'simple.css'],
    desc: 'simple.css',
  },
  style: {
    src: ['src', 'tpl', 'style-source', 'style.css'],
    desc: 'style.css',
  },
  typing: {
    src: ['src', 'tpl', 'style-source', 'typing.css'],
    desc: 'typing.css',
  },
  wecatch: {
    src: ['src', 'tpl', 'style-source', 'wecatch.css'],
    desc: 'wecatch.css',
  },
  'wecatch-code': {
    src: ['src', 'tpl', 'style-source', 'wecatch-code.css'],
    desc: 'wecatch-code.css',
  },
  xiaolai: {
    src: ['src', 'tpl', 'style-source', 'xiaolai.css'],
    desc: 'xiaolai.css',
  },
};

const hasPaddingSheets: string[] = [
  'github',
  'modest',
  'apollo',
  'infoq',
  'less',
  'list-writing',
  'ocean',
  'sanyuesha',
  'simple',
  'style',
  'typing',
  'wecatch',
  'wecatch-code',
  'xiaolai',
];

export const getBodyPadding0 = (stylesheet: string): string => {
  return hasPaddingSheets.includes(stylesheet) ? 'padding: 45px;' : '';
};

export const getBodyPadding1 = (stylesheet: string): string => {
  return hasPaddingSheets.includes(stylesheet) ? 'padding: 15px;' : '';
};
