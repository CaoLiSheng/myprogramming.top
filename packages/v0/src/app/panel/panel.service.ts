import { Injectable } from '@angular/core';

export interface PanelProps { x: number, y: number, w: number, h: number }

@Injectable ( { providedIn: 'root' } )
export class PanelService {

    private panels: Map<string, PanelProps> = new Map ();

    newPanel ( key: string, props: PanelProps ): void {
        const existProps = this.getPanel ( key );
        if ( existProps ) {
            mix ( existProps, props );
        } else {
            this.panels.set ( key, props );
        }
    }

    getPanel ( key: string ): PanelProps | undefined {
        return this.panels.get ( key );
    }

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mix ( obj: any, props: any ): void {
    Object.keys ( props ).forEach ( ( prop: string ) => {
        obj[prop] = props[prop];
    } );
}
