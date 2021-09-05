import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { PanelService, PanelProps } from './panel.service';

@Component ( {
    selector   : 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls  : [ './panel.component.scss' ],
} )
export class PanelComponent implements OnInit {

    @Output () close: EventEmitter<void> = new EventEmitter ();

    @Input () panelKey?: string;

    panel?: PanelProps;

    classNames?: string;

    constructor ( private serivce: PanelService ) {}
    
    ngOnInit (): void {
        if ( this.panelKey ) {
            this.panel = this.serivce.getPanel ( this.panelKey );

            this.classNames = [ 'modal-mask', this.panelKey ].join ( ' ' );
        }
    }

}
