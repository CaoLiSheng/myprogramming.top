import { isMobileSize } from 'commons/src/www/utils/design';

const __UNIT__ = 'rem';

export type SizeCfg = [number, number, number, number];

interface IconStyle {
  width: string;
  '--icon-size': string;
}

export default function calc ( cfg: SizeCfg ): IconStyle {
  const isMobile = isMobileSize ().result;

  return {
    width        : `${ isMobile ? cfg[1] : cfg[0] }${ __UNIT__ }`,
    '--icon-size': `${ isMobile ? cfg[3] : cfg[2] }${ __UNIT__ }`,
  };
}

export const iconSizeCfg1: SizeCfg = [ 0.5, 1, 0.25, 0.5 ];
