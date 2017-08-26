import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Router } from '@angular/router';
import {
  MdIconModule,
  MdGridListModule,
  MdCardModule,
  MdInputModule,
  MdSelectModule,
  MdOptionModule
 } from '@angular/material';

import { LibraryRoutingModule } from './library.routing';
import { LibraryComponent } from "./library.component";
import { SearchLibraryComponent } from "./search/search.component";

@NgModule({
  imports: [
    CommonModule,
    MdGridListModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdOptionModule,
    LibraryRoutingModule,
  ],
  declarations: [
    LibraryComponent,
    SearchLibraryComponent
  ],
  // exports: [LibraryComponent],
  providers: []
})
export class LibraryModule {

  // constructor(router: Router) {
  //   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }

}
