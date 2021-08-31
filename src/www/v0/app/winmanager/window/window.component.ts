import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { WindowDatum } from '../../../interfaces/window.datum';

@Component ( {
  selector   : 'app-window',
  templateUrl: './window.component.html',
  styleUrls  : [ './window.component.scss' ]
} )
export class WindowComponent implements OnInit, OnDestroy {
  
  @Output () close = new EventEmitter<void> ();

  @Output () focus = new EventEmitter<void> ();
  
  @Input () datum?: WindowDatum;

  @Input () zIndex?: number;

  src?: SafeResourceUrl;

  title?: string;

  dragging = false;

  dragClientX = 0;

  dragClientY = 0;

  dragStartX = 0;

  dragStartY = 0;

  x = 100;

  y = 50;

  maskStyle = 'none';

  onDragEventHandler: ( ( e: MouseEvent ) => void ) | null = null;

  onDragEndEventHandler : ( () => void ) | null = null;

  // constructor ( ) { }

  ngOnInit (): void {
    this.src = this.datum?.src;
    this.title = this.datum?.title;
    // this.zIndex = this.datum?.front ? 1 : 0;

    this.onDragEventHandler = this.onDrag.bind ( this );
    document.addEventListener ( 'mousemove', this.onDragEventHandler, false );

    this.onDragEndEventHandler = this.onDragEnd.bind ( this );
    document.addEventListener ( 'mouseup', this.onDragEndEventHandler, false );
    document.addEventListener ( 'mouseleave', this.onDragEndEventHandler, false );
  }
  
  ngOnDestroy (): void {
    if ( this.onDragEventHandler ) {
      document.removeEventListener ( 'mousemove', this.onDragEventHandler );
    }
    
    if ( this.onDragEndEventHandler ) {
      document.removeEventListener ( 'mouseup', this.onDragEndEventHandler );
      document.removeEventListener ( 'mouseleave', this.onDragEndEventHandler );
    }
  }

  // ngOnChanges ( changes: SimpleChanges ): void {
  //   // if ( changes.datum.previousValue?.front !== changes.datum.currentValue?.front ) {
  //     console.log ( 'on changes', changes.zIndex );
    
  //     this.zIndex = changes.datum.currentValue?.front ? 1 : 0;
  //   // }
  // }

  onDragStart ( e: MouseEvent ): void {
    this.dragging = true;
    this.maskStyle = 'block';
    this.dragStartX = this.x;
    this.dragStartY = this.y;
    this.dragClientX = e.clientX;
    this.dragClientY = e.clientY;
    this.focus.emit ();
    // console.log ( 'on drag start', this.dragStartX, this.dragStartY, this.dragClientX, this.dragClientY );
  }

  onDragEnd (): void {
    this.dragging = false;
    this.maskStyle = 'none';
    // console.log ( 'on drag end' );
  }

  onDrag ( e: MouseEvent ): void {
    if ( this.dragging ) {
      this.x = e.clientX - this.dragClientX + this.dragStartX;
      this.y = e.clientY - this.dragClientY + this.dragStartY;

      this.x = Math.max ( 0, this.x );
      this.y = Math.max ( 0, this.y );

      this.x = Math.min ( window.innerWidth, this.x );
      this.y = Math.min ( window.innerHeight, this.y );
      // console.log ( 'on drag', this.x, this.y );
    }
  }

}
