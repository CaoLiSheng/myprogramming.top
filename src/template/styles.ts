export interface StyleSheet {
  padding: { pc: string; mobile: string };
}

const NullPadding = { padding: { pc: '', mobile: '' } };
const WidePadding = { padding: { pc: '45px', mobile: '25px' } };
const ThinPadding = { padding: { pc: '25px', mobile: '10px' } };

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
