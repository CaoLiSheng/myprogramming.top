export interface StyleSheet {
  padding: { pc: string; mobile: string };
}

const UnsetPadding = { padding: { pc: '', mobile: '' } };
const PostfixPadding = (pc: number = 20, mobile: number = 10) => ({
  padding: { pc: `padding: ${pc}px;`, mobile: `padding: ${mobile}px;` },
});

const styles: { [key: string]: StyleSheet } = {
  air: UnsetPadding,
  lopash: UnsetPadding,
  citizen: UnsetPadding,
  splendor: UnsetPadding,
  antique: PostfixPadding(25),
  'github-border': UnsetPadding,
  'github-colors': PostfixPadding(),
  modest: PostfixPadding(),
};

export default styles;

const stylesWhichIsNotCompetibleForReceivingEmails: string[] = [];

export function notCompetibleForReceivingEmails(style: string): boolean {
  return stylesWhichIsNotCompetibleForReceivingEmails.some(
    (s: string) => s === style
  );
}
