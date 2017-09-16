import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MdSnackBar } from '@angular/material'

import { AuthServices } from '../../services/auth/auth.service'
import { Observable } from 'rxjs/Observable'


@Component({
    templateUrl: './find.component.html'
})
export class FindComponent {

    listUsers: Observable<any>
    find = { code: '', names: '' }

    constructor(
        private router: Router,
        private userServ: AuthServices,
        private snackBar: MdSnackBar
    ) {  }

    /**
     * addUser
     */
    public addUser(objUser: object): void {
        let obj = Object.create(objUser)
        obj['dni'] = obj['empdni_id']
        obj['charge'] = obj['charge__cargos']
        obj['email'] = `${obj['email']}`.toLowerCase()
        obj['names'] = `${obj['firstname']} ${obj['lastname']}`
        delete obj['charge__cargos']
        delete obj['firstname']
        delete obj['lastname']
        delete obj['empdni_id']
        this
            .userServ.addUserRemote(obj)
            .subscribe(
                res => {
                    this.snackBar.open('El Usuario se ha agregado correctamente!', null, { duration: 2000 })
                    setTimeout(() => {
                        this.router.navigate(['/home', 'users'])
                    }, 2100);
                },
                err => this.snackBar.open(`Error: ${err.error.raise}`, null, { duration: 2600 })
            )

        // console.log(obj)
    }

    /**
     * findByName
     */
    public findByNames(keyEvent: KeyboardEvent) {
        if (keyEvent.keyCode === 13) {
            this.listUsers = this.userServ.findUserRemote({ names: this.find.names })
        }
    }

    /**
     * findByDNI
     */
    public findByDNI(keyEvent: KeyboardEvent) {
        if (keyEvent.keyCode == 13) {
            this.listUsers = this.userServ.findUserRemote({dni: this.find.code })
        }
    }

}