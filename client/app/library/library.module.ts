import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdIconModule,
  MdGridListModule,
  MdCardModule,
  MdInputModule,
  MdSelectModule,
  MdOptionModule,
  MdAutocompleteModule,
  MdButtonModule
 } from '@angular/material';
 import { FlexLayoutModule } from '@angular/flex-layout';

import { LibraryRoutingModule } from './library.routing';
import { LibraryComponent } from './library.component';
import { SearchLibraryComponent } from './search/search.component';
import { NewBookComponent } from './book/new/new-book.component';
import { LibraryMainComponent } from './library-main.component';
import { BrandService } from '../services/sheet/brand.service';

@NgModule({
  imports: [
    CommonModule,
    MdGridListModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdOptionModule,
    MdAutocompleteModule,
    MdButtonModule,
    FormsModule,
    ReactiveFormsModule,
    LibraryRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    LibraryMainComponent,
    LibraryComponent,
    SearchLibraryComponent,
    NewBookComponent
  ],
  // exports: [LibraryComponent],
  providers: [BrandService]
})
export class LibraryModule {

  // constructor(router: Router) {
  //   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }

}
