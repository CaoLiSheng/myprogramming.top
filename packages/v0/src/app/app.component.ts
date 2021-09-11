import { Component, OnInit } from '@angular/core';

import { environment } from '../environments/environment';
import { WinManagerService } from './winmanager/winmanager.service';
import { PanelService } from './panel/panel.service';

@Component ( {
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  showPanels = [ false, false ];

  apps = [ 
    { src: 'http://localhost:3000', title: 'Blog | v1', iconUrl: 'assets/logo-v1.png' },
    { src: 'http://localhost:3333', title: 'Blog | v2', iconUrl: 'assets/logo-v2.png' },
  ];

  constructor (
    private winManagerService: WinManagerService,
    private panelService: PanelService
  ) { }
  
  ngOnInit (): void {
     if ( environment.production ) {
       this.apps = [
        { src: 'https://www.myprogramming.top/v1', title: 'Blog | v1', iconUrl: 'assets/logo-v1.png' },
        { src: 'https://www.myprogramming.top/v2', title: 'Blog | v2', iconUrl: 'assets/logo-v2.png' },
       ];
     }
  }

  hideAllExcept ( num?: number ): void {
    for ( let i=0; i<this.showPanels.length; i+=1 ) {
      this.showPanels[i] = false;
    }
    if ( num !== undefined ) {
      this.showPanels[num] = true;
    }
  }

  showGlassPanel ( e: MouseEvent ): void {
    const target = e.target as HTMLElement;

    const props = { x: 0, y: 0, w: 100, h: 300 };
    props.x = Math.min ( window.innerWidth - 105, target.offsetLeft + target.offsetWidth / 2 - props.w / 2 );
    props.y = 35;

    this.panelService.newPanel ( 'app-glass', props );

    this.hideAllExcept ( 1 );
  }

  glassResize ( btnIdx: number ): void {
    let x = 0;
    let y = 0;
    let w = 0;
    let h = 0;
    switch ( btnIdx ) {
      case 1: 
        x = 0;
        y = 28;
        w = window.innerWidth;
        h = ( window.innerHeight - 28 ) / 2;
        break;
      case 2:
        x = 0;
        y = 28;
        w = window.innerWidth;
        h = ( window.innerHeight - 28 ) / 2;
        y += h;
        break;
      case 3:
        x = 0;
        y = 28;
        w = window.innerWidth / 2;
        h = window.innerHeight - 28;
        break;
      case 4:
        x = 0;
        y = 28;
        w = window.innerWidth / 2;
        h = window.innerHeight - 28;
        x += w;
        break;
      case 5: 
        x = 0;
        y = 28;
        w = window.innerWidth / 2;
        h = ( window.innerHeight - 28 ) / 2;
        break;
      case 6:
        x = 0;
        y = 28;
        w = window.innerWidth / 2;
        h = ( window.innerHeight - 28 ) / 2;
        x += w;
        break;
      case 7:
        x = 0;
        y = 28;
        w = window.innerWidth / 2;
        h = ( window.innerHeight - 28 ) / 2;
        y += h;
        break;
      case 8:
        x = 0;
        y = 28;
        w = window.innerWidth / 2;
        h = ( window.innerHeight - 28 ) / 2;
        x += w;
        y += h;
        break;
      case 11:
        x = 0;
        y = 28;
        w = window.innerWidth / 3;
        h = window.innerHeight - 28;
        break;
      case 12:
        x = 0;
        y = 28;
        w = window.innerWidth * 2 / 3;
        h = window.innerHeight - 28;
        break;
      case 13:
        x = 0;
        y = 28;
        w = window.innerWidth / 3;
        h = window.innerHeight - 28;
        x += w;
        break;
      case 14:
        x = 0;
        y = 28;
        w = window.innerWidth * 2 / 3;
        h = window.innerHeight - 28;
        x += w / 2;
        break;
      case 15:
        x = 0;
        y = 28;
        w = window.innerWidth / 3;
        h = window.innerHeight - 28;
        x += w * 2;
        break;
      default:
        break;
    }
    this.winManagerService.glassResize ( x, y, w, h );
  }

  showAppsPanel ( e: MouseEvent ): void {
    const target = e.target as HTMLElement;

    const props = { x: 0, y: 0, w: 500, h: 300 };
    props.x = Math.max ( 5, target.offsetLeft + target.offsetWidth / 2 - props.w / 2 );
    props.y = 35;

    this.panelService.newPanel ( 'app-list', props );

    this.hideAllExcept ( 0 );
  }

  openApp ( title: string ): void {
    this.hideAllExcept ();

    const app = this.apps.find ( ( value: { title:string } ) => value.title === title );
    if ( app ) {
      this.winManagerService.add ( app.src, title, app.iconUrl );
    }
  }
}
