import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { uid } from '../../3rdlib/uid';
import { WindowDatum } from '../../interfaces/window.datum';

@Injectable ( { providedIn: 'root' } )
export class WinManagerService {

    private winKeys: string[] = [];

    private windows: Map<string, WindowDatum> = new Map ();

    constructor ( private sanitizer: DomSanitizer ) {}

    getWinKeys (): string[] {
         return this.winKeys;
    }

    getWindow ( key: string ): WindowDatum | undefined {
        return this.windows.get ( key );
    }
    
    add ( src: string, title: string, iconUrl: string ): void {
        const zIndex = this.windows.size;
        const key = uid ();
        this.winKeys.push ( key );
        this.windows.set ( key, {
            src : this.sanitizer.bypassSecurityTrustResourceUrl ( `${ src }?app=${ Date.now () }` ),
            iconUrl,
            title,
            zIndex,
            x   : 100,
            y   : 50,
            w   : 1366,
            h   : 800,
            zoom: 1,
        } );
        this.focus ( key );
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
                win.focused = false;
                if ( win.zIndex > focusWin.zIndex ) {
                    win.zIndex -= 1;
                }
            }
            focusWin.zIndex = this.windows.size - 1;
            focusWin.focused = true;
        }
        // console.log ( Array.from ( this.windows.values () ).map ( win => [ win.title, win.focused, win.zIndex ] ) );
    }

    maximize ( key: string ): void {
        const maxWin = this.windows.get ( key );
        if ( maxWin ) {
            if ( maxWin.prevWin ) {
                maxWin.x = maxWin.prevWin.x;
                maxWin.y = maxWin.prevWin.y;
                maxWin.w = maxWin.prevWin.w;
                maxWin.h = maxWin.prevWin.h;
                delete maxWin.prevWin;
            } else {
                maxWin.prevWin = {
                    x: maxWin.x,
                    y: maxWin.y,
                    w: maxWin.w,
                    h: maxWin.h,
                };
                maxWin.x = 0;
                maxWin.y = 28;
                maxWin.w = window.innerWidth;
                maxWin.h = window.innerHeight - 28;
            }
        }
    }

    minimize ( key: string ): void {
        const minWin = this.windows.get ( key );
        if ( minWin ) {
            minWin.zoom = 1 - minWin.zoom;
            if ( minWin.zoom === 1 ) {
                this.focus ( key );
            } else {
                let focusZIndex = this.windows.size - 1;
                focusZIndex = minWin.zIndex === focusZIndex ? focusZIndex - 1 : focusZIndex;
                for ( const winKey of this.winKeys ) {
                    const win = this.windows.get ( winKey );
                    if ( win?.zIndex === focusZIndex ) {
                        this.focus ( winKey );
                        break;
                    }
                }
            }
        } 
    }

    glassResize ( x: number, y: number, w: number, h: number ): void {
        Array.from ( this.windows.values () ).filter ( win => win.focused ).forEach ( win => {
            win.x = x;
            win.y = y;
            win.w = w;
            win.h = h;
        } );
    }

}