export interface StyleSheet {
  padding: { pc: string; mobile: string };
}

const NullPadding = { padding: { pc: '', mobile: '' } };
const WidePadding = {
  padding: { pc: 'padding: 45px;', mobile: 'padding: 25px;' },
};
const ThinPadding = {
  padding: { pc: 'padding: 25px;', mobile: 'padding: 10px;' },
};

const styles: { [key: string]: StyleSheet } = {
  air: NullPadding,
  antique: WidePadding,
  citizen: ThinPadding,
  'github-border': WidePadding,
  'github-colors': WidePadding,
  lopash: NullPadding,
  modest: WidePadding,
  retro: ThinPadding,
  splendor: ThinPadding,
};

export default styles;
