import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WindowComponent } from './window/window.component';
import { WinManagerComponent } from './winmanager/winmanager.component';

@NgModule ( {
  declarations: [
    AppComponent,
    WindowComponent,
    WinManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
