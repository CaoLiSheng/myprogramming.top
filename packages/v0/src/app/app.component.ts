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
    { src: 'https://www.myprogramming.top/v1', title: 'Blog | v1', iconUrl: 'assets/logo-v1.png' },
    { src: 'https://www.myprogramming.top/v2', title: 'Blog | v2', iconUrl: 'assets/logo-v2.png' },
  ];

  constructor ( private winManagerService: WinManagerService ) { }

  open ( title: string ): void {
    this.user = title;

    const app = this.apps.find ( ( value: { title:string } ) => value.title === title );
    if ( app ) {
      this.winManagerService.add ( app.src, title, app.iconUrl );
    }
  }
}
