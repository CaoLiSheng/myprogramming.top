const hasWidePaddingSheets: string[] = [
  'github-simple',
  'github-border',
  'modest',
  'antique',
];

const hasThinPaddingSheets: string[] = ['splendor', 'citizen'];

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
