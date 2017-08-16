import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './utils/not-found.component';
import { AppComponent } from './app.component';
import { AuthGuardLoign } from './services/auth-guard-login.services';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuardLoign],
    children: [
      {
        path: '',
        loadChildren: 'app/auth/auth.module#AuthModule'
      }
    ],
  },
  // { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
