import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component ( {
  selector   : 'app-window',
  templateUrl: './window.component.html',
  styleUrls  : [ './window.component.scss' ]
} )
export class WindowComponent implements OnInit, OnDestroy {
  dragging = false;

  dragClientX = 0;

  dragClientY = 0;

  dragStartX = 0;

  dragStartY = 0;
  
  @Input () title = '';

  @Input () src: SafeResourceUrl | null = null;

  x = 100;

  y = 50;

  maskStyle = 'none';

  onDragEventHandler: ( ( e: MouseEvent ) => void ) | null = null;

  onDragEndEventHandler : ( () => void ) | null = null;

  // constructor ( ) { }

  ngOnInit (): void {
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

  onDragStart ( e: MouseEvent ): void {
    this.dragging = true;
    this.maskStyle = 'block';
    this.dragStartX = this.x;
    this.dragStartY = this.y;
    this.dragClientX = e.clientX;
    this.dragClientY = e.clientY;
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
