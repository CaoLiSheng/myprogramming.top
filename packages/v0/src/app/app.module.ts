import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowsComponent } from './winmanager/windows/windows.component';
import { WindowComponent } from './winmanager/window/window.component';
import { TaskbarComponent } from './winmanager/taskbar/taskbar.component';
import { IconComponent } from './winmanager/icon/icon.component';

@NgModule ( {
  declarations: [
    AppComponent,
    WindowsComponent,
    WindowComponent,
    TaskbarComponent,
    IconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
