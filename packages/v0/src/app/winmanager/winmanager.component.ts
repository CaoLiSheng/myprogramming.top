import { Component } from '@angular/core';

import { WinManagerService } from './winmanager.service';

@Component ( {
  selector   : 'app-winmanager',
  templateUrl: './winmanager.component.html',
  styleUrls  : [ './winmanager.component.scss' ]
} )
export class WinManagerComponent {

  winKeys: string[] = this.service.getWinKeys ();

  constructor ( private service: WinManagerService ) { }

}
