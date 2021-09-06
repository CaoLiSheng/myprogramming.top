import { Component, Input, OnInit } from '@angular/core';

import { WindowDatum } from '../../../interfaces/window.datum';
import { WinManagerService } from '../winmanager.service';

@Component ( {
  selector   : 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls  : [ './icon.component.scss' ]
} )
export class IconComponent implements OnInit {

  @Input () winKey?: string;

  iconUrl = '';

  constructor ( private service: WinManagerService ) { }
  
  ngOnInit (): void {
    if ( this.winKey ) {
      this.iconUrl = this.service.getWindow ( this.winKey )?.iconUrl || '';
    }
  }

  onMinimize (): void {
    if ( this.winKey ) {
      this.service.minimize ( this.winKey );
    }
  }

}