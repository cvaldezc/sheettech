import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdCardModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdSidenavModule,
  MdListModule,
  MdToolbarModule,
  MdMenuModule,
  MdIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './utils/not-found.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { MenuComponent } from './utils/menus/menu.component';
import { ToolBarComponent } from './utils/menus/toolbar.component';
// import { HttpServices } from './services/http.Services';


@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    MenuComponent,
    PageNotFoundComponent,
    PermissionsComponent
  ],
  imports: [
    BrowserModule,
    // HttpModule,
    FlexLayoutModule,
    SimpleNotificationsModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdSidenavModule,
    MdListModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
