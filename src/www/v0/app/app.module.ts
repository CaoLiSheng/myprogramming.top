import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WinManagerComponent } from './winmanager/winmanager.component';
import { WindowComponent } from './winmanager/window/window.component';

@NgModule ( {
  declarations: [
    AppComponent,
    WinManagerComponent,
    WindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
