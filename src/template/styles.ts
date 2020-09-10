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
