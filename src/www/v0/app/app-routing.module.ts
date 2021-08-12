import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WinManagerComponent } from './winmanager/winmanager.component';

const routes: Routes = [
  { path: '', component: WinManagerComponent },
];

@NgModule ( {
  imports: [ RouterModule.forRoot ( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
