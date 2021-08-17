import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { WindowDatum } from '../../interfaces/window.datum';

@Component ( {
  selector   : 'app-winmanager',
  templateUrl: './winmanager.component.html',
  styleUrls  : [ './winmanager.component.scss' ]
} )
export class WinManagerComponent implements OnInit {

  windows: WindowDatum[] = [];

  constructor ( private sanitizer: DomSanitizer ) { }

  ngOnInit (): void {
    this.windows = [];
    // this.onOpen ( 'https://www.myprogramming.top/v1/', 'myprogramming.top|v1' );
    // this.onOpen ( 'https://www.myprogramming.top/v2/', 'myprogramming.top|v2' );
  }

  onOpen ( src: string, title: string ): void {
    const zIndex = this.windows.length;
    this.windows.push ( {
      src: this.sanitizer.bypassSecurityTrustResourceUrl ( `${ src }?app=${ Date.now () }` ),
      title,
      zIndex,
    } );
  }

  onClose ( datum: WindowDatum ): void {
    const idx = this.windows.indexOf ( datum );
    if ( idx !== -1 ) {
      this.windows = [
        ...this.windows.slice ( 0, idx ),
        ...this.windows.slice ( idx + 1 ),
      ];
      for ( const win of this.windows ) {
        if ( win.zIndex > idx ) {
          win.zIndex -= 1;
        }
      }
    }
  }

  onFocus ( datum: WindowDatum ): void {
    // console.log ( 'focus', datum );
    const idx = this.windows.indexOf ( datum );
    if ( idx !== -1 ) {
      for ( const win of this.windows ) {
        if ( win.zIndex > idx ) {
          win.zIndex -= 1;
        }
      }
    }
    datum.zIndex = this.windows.length - 1;
  }

}
