import { injectStyleSheetLinks } from '../www/utils/dom';
import { PublicMeta } from '../db';
import { MdConf } from './conf';

declare let __resource_dir__: string;

export async function prefetchStyles ( name: string, conf: MdConf, metas: { [key: string]: PublicMeta } ): Promise<boolean> {
  const baseStyle: string = metas[name]?.style;
  if ( !baseStyle ) return false;

  const requiredStyles = [ ...conf[baseStyle] ];
  await injectStyleSheetLinks (
    ...requiredStyles.map (
       ( common: string ) => `${ __resource_dir__ }reserved/styles/common/${ common }.css`
    ),
    `${ __resource_dir__ }reserved/styles/themes/${ baseStyle }.css`
  );
  return true;
}
