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
  air: ThinPadding,
  citizen: ThinPadding,
  modest: WidePadding,
  antique: WidePadding,
  'github-border': WidePadding,
  'github-colors': WidePadding,
  lopash: NullPadding,
  splendor: NullPadding,
};

export default styles;

const stylesWhichIsNotCompetibleForReceivingEmails = ['splendor'];

export function notCompetibleForReceivingEmails(style: string): boolean {
  return stylesWhichIsNotCompetibleForReceivingEmails.some(
    (s: string) => s === style
  );
}
