import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './utils/not-found.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { AuthGuardLoign } from './services/auth-guard-login.services';
import { AuthComponent } from './auth/auth.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuardLoign],
    children: [
      { path: 'permission/:auth', component: PermissionsComponent },
      { path: 'users', component: UserDetailsComponent },
      { path: '', loadChildren: 'app/library/library.module#LibraryModule' }
    ]
  },
  // {
  //   path: 'main',
  //   component: MainComponent, outlet: 'content', canActivate: [AuthGuardLoign],
  //   // children: [
  //   //   // { path: '', component: PageNotFoundComponent },
  //   //   // { path: '**', component: PageNotFoundComponent },
  //   //   { path: 'permission/:auth', component: PermissionsComponent, outlet: 'data' },
  //   //   { path: 'users', component: UserDetailsComponent, outlet: 'data' }
  //   // ]
  // },
  // { path: 'permission/:auth', component: PermissionsComponent, },
  // { path: 'users', component: UserDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule],
  providers: [AuthGuardLoign]
})
export class AppRoutingModule { }
