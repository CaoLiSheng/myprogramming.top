const commons = [ 'normalize', 'reset', 'blockquote', 'code', 'comments', 'date-tag', 'figure', 'table' ];

export const mdConf: { [key: string]: string[] } = {
  // 整体风格像一本书，或者一张羊皮卷
  antique           : [ ...commons, 'katex.min' ],
  // 中文多
  bountiful         : [ ...commons ],
  // 代码多
  github            : [ ...commons ],
  // 仅在首页使用
  solarized         : [ ...commons ],
  // 仅在简历使用
  'resume-bountiful': [ ...commons ],
};
