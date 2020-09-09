export default {
  github: {
    src: 'github.css',
    desc: 'github.css',
  },
  github2: {
    src: 'github2.css',
    desc: 'github2.css',
  },
  splendor: {
    src: 'splendor.css',
    desc: 'splendor.css',
  },
  air: {
    src: 'air.css',
    desc: 'air.css',
  },
  retro: {
    src: 'retro.css',
    desc: 'retro.css',
  },
  modest: {
    src: 'modest.css',
    desc: 'modest.css',
  },
  amblin: {
    src: 'amblin.css',
    desc: 'amblin.css',
  },
  antique: {
    src: 'antique.css',
    desc: 'antique.css',
  },
  citizen: {
    src: 'citizen.css',
    desc: 'citizen.css',
  },
  lopash: {
    src: 'lopash.css',
    desc: 'lopash.css',
  },
  ulysses: {
    src: 'ulysses.css',
    desc: 'ulysses.css',
  },
  apollo: {
    src: 'apollo.css',
    desc: 'apollo.css',
  },
  erye: {
    src: 'erye.css',
    desc: 'erye.css',
  },
  infoq: {
    src: 'infoq.css',
    desc: 'infoq.css',
  },
  less: {
    src: 'less.css',
    desc: 'less.css',
  },
  'list-writing': {
    src: 'list-writing.css',
    desc: 'list-writing.css',
  },
  ocean: {
    src: 'ocean.css',
    desc: 'ocean.css',
  },
  sanyuesha: {
    src: 'sanyuesha.css',
    desc: 'sanyuesha.css',
  },
  simple: {
    src: 'simple.css',
    desc: 'simple.css',
  },
  style: {
    src: 'style.css',
    desc: 'style.css',
  },
  typing: {
    src: 'typing.css',
    desc: 'typing.css',
  },
  wecatch: {
    src: 'wecatch.css',
    desc: 'wecatch.css',
  },
  'wecatch-code': {
    src: 'wecatch-code.css',
    desc: 'wecatch-code.css',
  },
  xiaolai: {
    src: 'xiaolai.css',
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

const hasThinPaddingSheets: string[] = [
  'erye',
  'ulysses',
  'splendor',
  'citizen',
];

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
