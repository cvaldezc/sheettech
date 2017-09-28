import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthServices } from '../../services/auth/auth.service'


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.sass']
})
export class ToolBarComponent implements OnInit {

    user: any = {
        name: '',
        email: '',
        charge: ''
    }

    constructor(private router: Router, private userServ: AuthServices) { }

    ngOnInit(): void {
        this.userServ.tokenLocal().then(res => {
            this.userServ.getAuth(this.userServ._auth)
                .subscribe(_user => this.user = _user)
        })

    }

    @Output() navToggle = new EventEmitter<boolean>()
    navOpen() {
        this.navToggle.emit(true)
    }

    sendLogout(): void {
        this.router.navigate(['/logout'])
    }

}
