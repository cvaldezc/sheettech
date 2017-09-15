import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login.component'
import { LogoutComponent } from './logout.component'
import { AuthComponent } from './auth.component'
// import { FindComponent } from './findremote/find.component'
import { AuthGuardLoign } from '../services/auth-guard-login.services'
import { AuthServices } from '../services/auth/auth.service'
import { UserServices } from '../services/auth/user.service'

const authRoutes: Routes = [
  // { path: 'users', component: FindComponent },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardLoign],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    // canActivate: [AuthGuardLoign]
  }
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [],
  providers: [
    AuthGuardLoign,
    AuthServices,
    UserServices
  ]
})
export class AuthRoutingModule { }
