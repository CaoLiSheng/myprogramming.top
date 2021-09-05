import { Component } from '@angular/core';

import { WinManagerService } from './winmanager/winmanager.service';
import { PanelService } from './panel/panel.service';

@Component ( {
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.scss' ]
} )
export class AppComponent {
  showApps = false;

  apps = [ 
    { src: 'https://www.myprogramming.top/v1', title: 'Blog | v1', iconUrl: 'assets/logo-v1.png' },
    { src: 'https://www.myprogramming.top/v2', title: 'Blog | v2', iconUrl: 'assets/logo-v2.png' },
  ];

  constructor (
    private winManagerService: WinManagerService,
    private panelService: PanelService
  ) { }

  showAppsPanel ( e: MouseEvent ): void {
    const target = e.target as HTMLElement;

    const props = { x: 0, y: 0, w: 500, h: 300 };
    props.x = Math.max ( 5, target.offsetLeft + target.offsetWidth / 2 - props.w / 2 );
    props.y = 35;

    this.panelService.newPanel ( 'app-list', props );

    this.showApps = true;
  }

  openApp ( title: string ): void {
    this.showApps = false;

    const app = this.apps.find ( ( value: { title:string } ) => value.title === title );
    if ( app ) {
      this.winManagerService.add ( app.src, title, app.iconUrl );
    }
  }
}
