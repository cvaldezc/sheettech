import { Component, OnInit } from '@angular/core'

import { AuthServices } from '../../services/auth/auth.service'


@Component({
    templateUrl: './find.component.html'
})
export class FindComponent implements OnInit {

    constructor(private userServ: AuthServices){

    }

    ngOnInit(): void {

        this.userServ.findUserRemote({dni: '70492850'})
            .subscribe( res => console.log(res))
    }

}