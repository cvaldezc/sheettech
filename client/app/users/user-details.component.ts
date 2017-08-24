import { Component, OnInit } from '@angular/core';

import { AuthServices } from '../services/auth/auth.service';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

    auths: any

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
    }

}
