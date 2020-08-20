export default {
  github: {
    src: ['src', 'tpl', 'style-source', 'github.css'],
    desc: 'github.css',
  },
  github2: {
    src: ['src', 'tpl', 'style-source', 'github2.css'],
    desc: 'github2.css',
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
  antique: {
    src: ['src', 'tpl', 'style-source', 'antique.css'],
    desc: 'antique.css',
  },
  citizen: {
    src: ['src', 'tpl', 'style-source', 'citizen.css'],
    desc: 'citizen.css',
  },
  lopash: {
    src: ['src', 'tpl', 'style-source', 'lopash.css'],
    desc: 'lopash.css',
  },
  ulysses: {
    src: ['src', 'tpl', 'style-source', 'ulysses.css'],
    desc: 'ulysses.css',
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

const hasWidePaddingSheets: string[] = [
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

const hasThinPaddingSheets: string[] = ['erye', 'ulysses', 'splendor'];

export const getBodyPadding0 = (stylesheet: string): string => {
  if (hasWidePaddingSheets.includes(stylesheet)) return 'padding: 45px;';
  if (hasThinPaddingSheets.includes(stylesheet)) return 'padding: 25px;';
  return '';
};

export const getBodyPadding1 = (stylesheet: string): string => {
  if (hasWidePaddingSheets.includes(stylesheet)) return 'padding: 15px;';
  if (hasThinPaddingSheets.includes(stylesheet)) return 'padding: 10px;';
  return '';
};
