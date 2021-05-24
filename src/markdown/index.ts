import { PublicMeta } from '@common/db';
import { injectStyleSheetLinks } from '@utils/dom';

declare let __resource_dir__: string;

const commons = [ 'normalize', 'reset', 'blockquote', 'code', 'comments', 'date-tag', 'figure', 'table' ];

export interface MdConf {
  [key: string]: string[]
}

export const mdConf: MdConf = {
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

export async function fetchPost ( name: string, conf: MdConf, metas: { [key: string]: PublicMeta } ): Promise<boolean> {
  const baseStyle = metas[name]?.style;
  if ( !baseStyle ) return false;

  const requiredStyles = [ ...conf[baseStyle] ];
  await injectStyleSheetLinks (
    ...requiredStyles.map (
       ( common: string ) => `${ __resource_dir__ }.reserved/styles/common/${ common }.css`
    ),
    `${ __resource_dir__ }.reserved/styles/themes/${ baseStyle }.css`
  );
  return true;
}
