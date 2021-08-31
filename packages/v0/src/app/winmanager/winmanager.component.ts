import { Component } from '@angular/core';

import { WindowDatum } from '../../interfaces/window.datum';
import { WinManagerService } from './winmanager.service';

@Component ( {
  selector   : 'app-winmanager',
  templateUrl: './winmanager.component.html',
  styleUrls  : [ './winmanager.component.scss' ]
} )
export class WinManagerComponent {

  windows: WindowDatum[] = this.service.getData ();

  constructor ( private service: WinManagerService ) { }

  onClose ( datum: WindowDatum ): void {
    this.service.delete ( datum );
  }

  onFocus ( datum: WindowDatum ): void {
    this.service.focus ( datum );
  }

}
