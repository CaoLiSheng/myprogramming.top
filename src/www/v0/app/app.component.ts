import { Component } from '@angular/core';

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

  log ( app: { title: string } ): void {
    this.user = app.title;
  }
}
