import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { uid } from '../../3rdlib/uid';
import { WindowDatum } from '../../interfaces/window.datum';

@Injectable ( { providedIn: 'root' } )
export class WinManagerService {

    private winKeys: string[] = [];

    private windows: Map<string, WindowDatum> = new Map<string, WindowDatum> ();

    constructor ( private sanitizer: DomSanitizer ) {}

    getWinKeys (): string[] {
         return this.winKeys;
    }

    getWindow ( key: string ): WindowDatum | undefined {
        return this.windows.get ( key );
    }
    
    add ( src: string, title: string ): void {
        const zIndex = this.windows.size;
        const key = uid ();
        this.winKeys.push ( key );
        this.windows.set ( key, {
            src: this.sanitizer.bypassSecurityTrustResourceUrl ( `${ src }?app=${ Date.now () }` ),
            title,
            zIndex,
            x  : 100,
            y  : 50,
            w  : 1366,
            h  : 800,
        } );
    }

    delete ( key: string ): void {
        const delWin = this.windows.get ( key );
        if ( delWin ) {
            this.windows.delete ( key );
            this.winKeys.splice ( this.winKeys.indexOf ( key ), 1 );
        
            for ( const win of this.windows.values () ) {
                if ( win.zIndex > delWin.zIndex ) {
                    win.zIndex -= 1;
                }
            }
        }
    }

    focus ( key: string ): void {
        const focusWin = this.windows.get ( key );
        if ( focusWin ) {
            for ( const win of this.windows.values () ) {
                if ( win.zIndex > focusWin.zIndex ) {
                    win.zIndex -= 1;
                }
            }
            focusWin.zIndex = this.windows.size - 1;
        }
    }

}