import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { WindowDatum } from '../../interfaces/window.datum';

@Injectable ( { providedIn: 'root' } )
export class WinManagerService {

    windows: WindowDatum[] = [];

    constructor ( private sanitizer: DomSanitizer ) {}

    getData (): WindowDatum[] {
        return this.windows;
    }
    
    add ( src: string, title: string ): void {
        const zIndex = this.windows.length;
        this.windows.push ( {
            src: this.sanitizer.bypassSecurityTrustResourceUrl ( `${ src }?app=${ Date.now () }` ),
            title,
            zIndex,
        } );
    }

    delete ( datum: WindowDatum ): void {
        const idx = this.windows.indexOf ( datum );
        if ( idx !== -1 ) {
            this.windows.splice ( idx, 1 );
            for ( const win of this.windows ) {
                if ( win.zIndex > idx ) {
                    win.zIndex -= 1;
                }
            }
        }
    }

    focus ( datum: WindowDatum ): void {
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