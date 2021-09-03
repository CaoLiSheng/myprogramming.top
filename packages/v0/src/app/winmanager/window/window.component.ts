import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { WindowDatum } from '../../../interfaces/window.datum';
import { WinManagerService } from '../winmanager.service';

@Component ( {
  selector   : 'app-window',
  templateUrl: './window.component.html',
  styleUrls  : [ './window.component.scss' ]
} )
export class WindowComponent implements OnInit, OnDestroy {
  
  @Input () winKey?: string;

  win?: WindowDatum;

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

  maskStyle = 'none';

  onDragEventHandler: ( ( e: MouseEvent ) => void ) | null = null;

  onDragEndEventHandler : ( () => void ) | null = null;

  constructor ( private service: WinManagerService ) { }

  ngOnInit (): void {
    if ( this.winKey ) {
      this.win = this.service.getWindow ( this.winKey );
    }

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

  onClose (): void {
    if ( this.winKey ) {
      this.service.delete ( this.winKey );
    }
  }

  onDragStart ( e: MouseEvent ): void {
    if ( !this.win || !this.winKey ) return;

    this.handlerState = 1;
    this.maskStyle = 'block';
    this.dragStartX = this.win.x;
    this.dragStartY = this.win.y;
    this.dragClientX = e.clientX;
    this.dragClientY = e.clientY;
    this.service.focus ( this.winKey );
    // console.log ( 'on drag start', this.dragStartX, this.dragStartY, this.dragClientX, this.dragClientY );
  }

  initResize ( state: number, e: MouseEvent ):void {
    if ( !this.win || !this.winKey ) return;

    this.handlerState = state;
    this.maskStyle = 'block';
    this.dragStartX = this.win.x;
    this.dragStartY = this.win.y;
    this.dragStartW = this.win.w;
    this.dragStartH = this.win.h;
    this.dragClientX = e.clientX;
    this.dragClientY = e.clientY;
    this.service.focus ( this.winKey );
    // console.log ( 'on resize start', this.dragStartX, this.dragStartY, this.dragStartW, this.dragStartH, this.dragClientX, this.dragClientY );
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
    // console.log ( 'on drag end' );
  }

  onDrag ( e: MouseEvent ): void {
    if ( !this.win ) return;

    switch ( this.handlerState ) {
      case 1:
        this.win.x = e.clientX - this.dragClientX + this.dragStartX;
        this.win.y = e.clientY - this.dragClientY + this.dragStartY;

        // this.win.x = Math.max ( 0, this.win.x );
        // this.win.y = Math.max ( 0, this.win.y );

        // this.win.x = Math.min ( window.innerWidth, this.win.x );
        // this.win.y = Math.min ( window.innerHeight, this.win.y );
        // console.log ( 'on drag', this.win.x, this.win.y );
        break;
      case 2:
        this.win.h = this.dragClientY - e.clientY + this.dragStartH;

        this.win.h = Math.max ( 50, this.win.h );

        this.win.y = this.dragStartH - this.win.h + this.dragStartY;

        // console.log ( 'on drag', this.win.y, this.win.h );
        break;
      case 3:
        this.win.h = e.clientY - this.dragClientY + this.dragStartH;

        this.win.h = Math.max ( 50, this.win.h );

        // console.log ( 'on drag', this.win.h );
        break;
      case 4:
        this.win.w = this.dragClientX - e.clientX + this.dragStartW;

        this.win.w = Math.max ( 750, this.win.w );

        this.win.x = this.dragStartW - this.win.w + this.dragStartX;

        // console.log ( 'on drag', this.win.x, this.win.w );
        break;
      case 5:
        this.win.w = e.clientX - this.dragClientX + this.dragStartW;

        this.win.w = Math.max ( 750, this.win.w );

        // console.log ( 'on drag', this.win.w );
        break;
      case 6:
        this.win.w = this.dragClientX - e.clientX + this.dragStartW;
        this.win.h = this.dragClientY - e.clientY + this.dragStartH;

        this.win.w = Math.max ( 750, this.win.w );
        this.win.h = Math.max ( 50, this.win.h );

        this.win.x = this.dragStartW - this.win.w + this.dragStartX;
        this.win.y = this.dragStartH - this.win.h + this.dragStartY;
        break;
      case 7:
        this.win.w = e.clientX - this.dragClientX + this.dragStartW;
        this.win.h = this.dragClientY - e.clientY + this.dragStartH;

        this.win.w = Math.max ( 750, this.win.w );
        this.win.h = Math.max ( 50, this.win.h );

        this.win.y = this.dragStartH - this.win.h + this.dragStartY;
        break;
      case 8:
        this.win.w = this.dragClientX - e.clientX + this.dragStartW;
        this.win.h = e.clientY - this.dragClientY + this.dragStartH;

        this.win.w = Math.max ( 750, this.win.w );
        this.win.h = Math.max ( 50, this.win.h );

        this.win.x = this.dragStartW - this.win.w + this.dragStartX;
        break;
      case 9:
        this.win.w = e.clientX - this.dragClientX + this.dragStartW;
        this.win.h = e.clientY - this.dragClientY + this.dragStartH;

        this.win.w = Math.max ( 750, this.win.w );
        this.win.h = Math.max ( 50, this.win.h );
        break;
      default:
        break;
    }
  }

}
