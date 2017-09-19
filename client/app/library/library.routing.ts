import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LibraryMainComponent } from "./library-main.component"
import { LibraryComponent } from './library.component'
import { NewBookComponent } from './book/new/new-book.component'
import { AuthGuardLoign } from '../services/auth-guard-login.services'
import { SheetDetailsComponent } from './book/details/sheet-details.component'
import { UDComponent } from './book/ud/ud.component'


const libraryRoutes: Routes = [
    {
        path: 'library',
        component: LibraryMainComponent,
        children: [
            { path: 'sheet', component: LibraryComponent },
            { path: 'new', component: NewBookComponent, canActivate: [AuthGuardLoign] },
            { path: 'details/:sheet', component: SheetDetailsComponent, canActivate: [AuthGuardLoign] },
            { path: 'ud/:sheet', component: UDComponent, canActivate: [AuthGuardLoign] }
        ]
     }
]

@NgModule({
    imports: [
        RouterModule.forChild(libraryRoutes)
    ],
    exports: [RouterModule]
})
export class LibraryRoutingModule { }
