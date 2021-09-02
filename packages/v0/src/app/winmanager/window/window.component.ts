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

  /**
   * -1: 没有事件
   * 1 : 拖拽标题栏
   * 2 : 从顶部重制大小
   * 3 : 从底部重制大小
   * 4 : 从左侧重制大小
   * 5 : 从右侧重制大小
   * 6 : 从顶部左侧重制大小
   * 7 : 从顶部右侧重制大小
   * 8 : 从底部左侧重制大小
   * 9 : 从底部右侧重制大小
   */
  handlerState = -1;

  dragClientX = 0;

  dragClientY = 0;

  dragStartX = 0;

  dragStartY = 0;

  dragStartW = 0;

  dragStartH = 0;

  x = 100;

  y = 50;

  w = 1366;

  h = 800;

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

  onDragStart ( e: MouseEvent ): void {
    this.handlerState = 1;
    this.maskStyle = 'block';
    this.dragStartX = this.x;
    this.dragStartY = this.y;
    this.dragClientX = e.clientX;
    this.dragClientY = e.clientY;
    this.focus.emit ();
    // console.log ( 'on drag start', this.dragStartX, this.dragStartY, this.dragClientX, this.dragClientY );
  }

  initResize ( state: number, e: MouseEvent ):void {
    this.handlerState = state;
    this.maskStyle = 'block';
    this.dragStartX = this.x;
    this.dragStartY = this.y;
    this.dragStartW = this.w;
    this.dragStartH = this.h;
    this.dragClientX = e.clientX;
    this.dragClientY = e.clientY;
    this.focus.emit ();
  }

  onTopResizeStart ( e: MouseEvent ): void {
    this.initResize ( 2, e );
  }

  onBottomResizeStart ( e: MouseEvent ): void {
    this.initResize ( 3, e );
  }

  onLeftResizeStart ( e: MouseEvent ): void {
    this.initResize ( 4, e );
  }

  onRightResizeStart ( e: MouseEvent ): void {
    this.initResize ( 5, e );
  }

  onTopLeftResizeStart ( e: MouseEvent ): void {
    this.initResize ( 6, e );
  }

  onTopRightResizeStart ( e: MouseEvent ): void {
    this.initResize ( 7, e );
  }

  onBottomLeftResizeStart ( e: MouseEvent ): void {
    this.initResize ( 8, e );
  }

  onBottomRightResizeStart ( e: MouseEvent ): void {
    this.initResize ( 9, e );
  }

  onDragEnd (): void {
    this.handlerState = -1;
    this.maskStyle = 'none';
    console.log ( 'on drag end' );
  }

  onDrag ( e: MouseEvent ): void {
    switch ( this.handlerState ) {
      case 1:
        this.x = e.clientX - this.dragClientX + this.dragStartX;
        this.y = e.clientY - this.dragClientY + this.dragStartY;

        // this.x = Math.max ( 0, this.x );
        // this.y = Math.max ( 0, this.y );

        // this.x = Math.min ( window.innerWidth, this.x );
        // this.y = Math.min ( window.innerHeight, this.y );
        // console.log ( 'on drag', this.x, this.y );
        break;
      case 2:
        this.h = this.dragClientY - e.clientY + this.dragStartH;

        this.h = Math.max ( 50, this.h );

        this.y = this.dragStartH - this.h + this.dragStartY;

        // console.log ( 'on drag', this.y, this.h );
        break;
      case 3:
        this.h = e.clientY - this.dragClientY + this.dragStartH;

        this.h = Math.max ( 50, this.h );

        // console.log ( 'on drag', this.h );
        break;
      case 4:
        this.w = this.dragClientX - e.clientX + this.dragStartW;

        this.w = Math.max ( 750, this.w );

        this.x = this.dragStartW - this.w + this.dragStartX;

        // console.log ( 'on drag', this.x, this.w );
        break;
      case 5:
        this.w = e.clientX - this.dragClientX + this.dragStartW;

        this.w = Math.max ( 750, this.w );

        // console.log ( 'on drag', this.w );
        break;
      case 6:
        this.w = this.dragClientX - e.clientX + this.dragStartW;
        this.h = this.dragClientY - e.clientY + this.dragStartH;

        this.w = Math.max ( 750, this.w );
        this.h = Math.max ( 50, this.h );

        this.x = this.dragStartW - this.w + this.dragStartX;
        this.y = this.dragStartH - this.h + this.dragStartY;
        break;
      case 7:
        this.w = e.clientX - this.dragClientX + this.dragStartW;
        this.h = this.dragClientY - e.clientY + this.dragStartH;

        this.w = Math.max ( 750, this.w );
        this.h = Math.max ( 50, this.h );

        this.y = this.dragStartH - this.h + this.dragStartY;
        break;
      case 8:
        this.w = this.dragClientX - e.clientX + this.dragStartW;
        this.h = e.clientY - this.dragClientY + this.dragStartH;

        this.w = Math.max ( 750, this.w );
        this.h = Math.max ( 50, this.h );

        this.x = this.dragStartW - this.w + this.dragStartX;
        break;
      case 9:
        this.w = e.clientX - this.dragClientX + this.dragStartW;
        this.h = e.clientY - this.dragClientY + this.dragStartH;

        this.w = Math.max ( 750, this.w );
        this.h = Math.max ( 50, this.h );
        break;
      default:
        break;
    }
  }

}
