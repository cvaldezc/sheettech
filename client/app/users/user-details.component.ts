import { Component, OnInit } from '@angular/core'
import { MdSnackBar } from '@angular/material'

import { AuthServices } from '../services/auth/auth.service'
import { IPermission } from '../../../server/apps/restful/interfaces/Permission.interface'

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

    auths: any
    // permission: IPermission = {
    //     reader: true,
    //     write: false,
    //     delete: false
    // }

    constructor(
        public userServ: AuthServices,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit(): void {
        this.userServ.getAuthsRegister()
            .subscribe(
                observer => {
                    this.auths = observer
                    console.log(this.auths)
                },
                error => {
                    console.log(error)
                }
            )
        // console.log(this.userServ.permission)
    }


    /**
     * showAskRemove
     * @param auth
     */
    public showAskRemove(auth: string, names: string): void {
        this
            .snackBar
            .open(`Desea eliminar el usuario ${names}?`, 'Si!, eliminar', { duration: 8000})
            .onAction()
            .subscribe(
                observer => {
                    this.deleteUser(auth)
                }
            )
    }

    /**
     * deleteUser
     */
    public deleteUser(auth: string): void {
        this
            .userServ.removeUser(auth)
            .subscribe(
                res => {
                    console.log(res)
                    this.snackBar.open(`${res.msg}!`, null, { duration: 2600 })
                    this.ngOnInit()
                },
                err =>{
                    console.log(err)
                    this.snackBar.open(`Error: ${err.error.raise}`, null, { duration: 2600 })
                }
            )
    }

}
