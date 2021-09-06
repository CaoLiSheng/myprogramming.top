import { SafeResourceUrl } from '@angular/platform-browser';

export interface WindowDatum {
  src: SafeResourceUrl;
  iconUrl: string;
  title: string;
  zIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
  prevWin?: {
    x: number;
    y: number;
    w: number;
    h: number;
  },
  zoom: number;
  forceMask?: boolean;
}
