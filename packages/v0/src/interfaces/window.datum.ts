import { SafeResourceUrl } from '@angular/platform-browser';

export interface WindowDatum {
  src: SafeResourceUrl;
  title: string;
  zIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
}
