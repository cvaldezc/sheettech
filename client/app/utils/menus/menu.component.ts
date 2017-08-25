import { Component, Input, OnChanges, SimpleChanges, SimpleChange, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { AuthGuardLoign } from '../../services/auth-guard-login.services';
import { AuthServices } from '../../services/auth/auth.service';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

    authPrms: string = '';
    isLogin = false
    isAdmin = false

    constructor(
        private authGuard: AuthGuardLoign,
        private servAuth: AuthServices) {
        this.isAdmin = servAuth.isAdmin
        this.isLogin = servAuth.isLoggedIn
    }


    @ViewChild('navmain') sidenav: MdSidenav;

    @Input()
    set showToggle(showToggle: boolean) {
        this.sidenav.toggle();
        console.log(showToggle);
    }

    ngOnInit(): void {
        this.servAuth.decodedTokenLocal()
            .subscribe(
                (observer: any) => {
                    // console.log("OBserver", observer)
                    if ( observer['status']) {
                        this.authPrms = observer['payload']['auth']
                        this.isAdmin = observer['payload']['isAdmin']
                    }else{
                        alert(observer['err']['message'])
                    }
                },
                error => {
                    alert(error)
                }
            )
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     const view: SimpleChange = changes.showToggle;
    //     // console.log('another msg', view);

    // }


 }
