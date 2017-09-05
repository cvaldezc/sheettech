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
  MdButtonModule,
  MdDialogModule,
  MdProgressBarModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { LibraryRoutingModule } from './library.routing';
import { LibraryComponent } from './library.component';
import { SearchLibraryComponent } from './search/search.component';
import { NewBookComponent } from './book/new/new-book.component';
import { LibraryMainComponent } from './library-main.component';
import { BrandService } from '../services/sheet/brand.service';
import { ModelService } from '../services/sheet/model.service';
import { DialogMaterial } from './search/master-remote.component';
import { MasterService } from '../services/master.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { SheetService } from '../services/sheet/sheet.service';
import { SearchResultComponent } from './search/search-result.component';
import { SheetDetailsComponent } from './book/details/sheet-details.component';


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
    MdDialogModule,
    MdProgressBarModule,
    ReactiveFormsModule,
    LibraryRoutingModule,
    FlexLayoutModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    FilterPipe,
    LibraryMainComponent,
    LibraryComponent,
    SearchLibraryComponent,
    NewBookComponent,
    SearchResultComponent,
    DialogMaterial,
    SheetDetailsComponent
  ],
  exports: [FilterPipe],
  bootstrap: [DialogMaterial],
  providers: [
    SheetService,
    BrandService,
    ModelService,
    MasterService]
})
export class LibraryModule {  }
