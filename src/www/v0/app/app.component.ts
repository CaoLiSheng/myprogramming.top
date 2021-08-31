import { Component } from '@angular/core';

import { WinManagerService } from './winmanager/winmanager.service';

@Component ( {
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.scss' ]
} )
export class AppComponent {
  showApps = false;

  user = 'app';

  apps = [ 
    { src: 'https://www.myprogramming.top/v1', title: 'Blog | v1' },
    { src: 'https://www.myprogramming.top/v2', title: 'Blog | v2' },
  ];

  constructor ( private winManagerService: WinManagerService ) { }

  open ( title: string, src: string ): void {
    this.user = title;
    this.winManagerService.add ( src, title );
  }
}
