export interface StyleSheet {
  padding: { pc: string; mobile: string };
}

// const UnsetPadding = { padding: { pc: '', mobile: '' } };
const PostfixPadding = (pc: number = 20, mobile?: number) => ({
  padding: { pc: `padding: ${pc}px;`, mobile: `padding: ${mobile || pc}px;` },
});

const styles: { [key: string]: StyleSheet } = {
  github: PostfixPadding(), // 代码多
  antique: PostfixPadding(), // 整体风格像一本书，或者一张羊皮卷
  bountiful: PostfixPadding(), // 中文多
  solarized: PostfixPadding(), // 仅在首页使用
  'resume-bountiful': PostfixPadding(), // 仅在简历使用
};

export default styles;

const stylesWhichIsNotCompetibleForReceivingEmails: string[] = [];

export function notCompetibleForReceivingEmails(style: string): boolean {
  return stylesWhichIsNotCompetibleForReceivingEmails.some(
    (s: string) => s === style
  );
}
