import { Component } from '@angular/core';

import { WinManagerService } from '../winmanager.service';

@Component ( {
  selector   : 'app-windows',
  templateUrl: './windows.component.html',
  styleUrls  : [ ]
} )
export class WindowsComponent {

  winKeys: string[] = this.service.getWinKeys ();

  constructor ( private service: WinManagerService ) { }

}