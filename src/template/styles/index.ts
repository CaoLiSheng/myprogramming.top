export interface StyleSheet {
  padding: { pc: string; mobile: string };
}

const UnsetPadding = { padding: { pc: '', mobile: '' } };
const PostfixPadding = (pc: number = 20, mobile?: number) => ({
  padding: { pc: `padding: ${pc}px;`, mobile: `padding: ${mobile || pc}px;` },
});

const styles: { [key: string]: StyleSheet } = {
  antique: PostfixPadding(),
  bountiful: PostfixPadding(),
  solarized: PostfixPadding(),
  'github-colors': PostfixPadding(),
  'github-border': UnsetPadding,
};

export default styles;

const stylesWhichIsNotCompetibleForReceivingEmails: string[] = [];

export function notCompetibleForReceivingEmails(style: string): boolean {
  return stylesWhichIsNotCompetibleForReceivingEmails.some(
    (s: string) => s === style
  );
}
