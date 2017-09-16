import { Component, OnInit } from '@angular/core'

import { AuthServices } from '../../services/auth/auth.service'
import { Observable } from 'rxjs/Observable'


@Component({
    templateUrl: './find.component.html'
})
export class FindComponent implements OnInit {

    listUsers: Observable<any>
    find = { code: '', names: '' }

    constructor(private userServ: AuthServices) {  }

    ngOnInit(): void {

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