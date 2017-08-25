import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Router } from '@angular/router';
import {
  MdIconModule
 } from '@angular/material';

import { LibraryRoutingModule } from './library.routing';
import { LibraryComponent } from "./library.component";

@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    LibraryRoutingModule,
    MdIconModule,
  ],
  declarations: [
    LibraryComponent
  ],
  providers: []
})
export class LibraryModule {

  // constructor(router: Router) {
  //   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }

}
