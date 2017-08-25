import { Component, OnInit } from '@angular/core';

import { AuthServices } from '../services/auth/auth.service';
import { IPermission } from "../../../server/apps/restful/interfaces/Permission.interface";

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

    auths: any
    permission: IPermission = {
        reader: true,
        write: false,
        delete: false
    }

    constructor(private servAuth: AuthServices) {
        console.log(this.servAuth.isAdmin)
        console.log(this.servAuth.isLoggedIn)

     }

    ngOnInit(): void {
        this.servAuth.getAuthsRegister()
            .subscribe(
                observer => {
                    this.auths = observer
                    console.table(this.auths)
                },
                error => {
                    console.log(error)
                }
            )
        console.log(this.servAuth.permission)
    }

}
