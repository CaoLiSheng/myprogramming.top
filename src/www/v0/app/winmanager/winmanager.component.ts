import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface WindowDatum {
  src: SafeResourceUrl;
  title: string;
}

@Component ( {
  selector   : 'app-winmanager',
  templateUrl: './winmanager.component.html',
  styleUrls  : [ './winmanager.component.scss' ]
} )
export class WinManagerComponent implements OnInit {

  windows: WindowDatum[] = [];

  constructor ( private sanitizer: DomSanitizer ) { }

  ngOnInit (): void {
    this.windows = [
      { src: this.sanitizer.bypassSecurityTrustResourceUrl ( 'https://www.myprogramming.top/v1/' ), title: 'myprogramming.top' },
    ];
  }

}
