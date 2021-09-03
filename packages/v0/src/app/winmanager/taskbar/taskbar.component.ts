import { Component } from '@angular/core';

import { WinManagerService } from '../winmanager.service';

@Component ( {
  selector   : 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls  : [ './taskbar.component.scss' ]
} )
export class TaskbarComponent {
  
  winKeys: string[] = this.service.getWinKeys ();

  constructor ( private service: WinManagerService ) { }

}