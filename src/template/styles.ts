export interface StyleSheet {
  padding: { pc: string; mobile: string };
}

const UnsetPadding = { padding: { pc: '', mobile: '' } };
const PostfixPadding = {
  padding: { pc: 'padding: 20px;', mobile: 'padding: 10px;' },
};

const styles: { [key: string]: StyleSheet } = {
  air: UnsetPadding,
  lopash: UnsetPadding,
  citizen: UnsetPadding,
  antique: UnsetPadding,
  splendor: UnsetPadding,
  'github-border': UnsetPadding,
  'github-colors': PostfixPadding,
  modest: PostfixPadding,
};

export default styles;

const stylesWhichIsNotCompetibleForReceivingEmails: string[] = [];

export function notCompetibleForReceivingEmails(style: string): boolean {
  return stylesWhichIsNotCompetibleForReceivingEmails.some(
    (s: string) => s === style
  );
}
