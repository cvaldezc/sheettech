import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryComponent } from './library.component';


const libraryRoutes: Routes = [
    { path: 'library', component: LibraryComponent }
]

// export const routingLibrary: ModuleWithProviders = RouterModule.forChild(libraryRoutes)
@NgModule({
    imports: [
        RouterModule.forChild(libraryRoutes)
    ],
    exports: []
})
export class LibraryRoutingModule { }
