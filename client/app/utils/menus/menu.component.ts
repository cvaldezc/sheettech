import { Component, Input, OnChanges, SimpleChanges, SimpleChange, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { AuthGuardLoign } from '../../services/auth-guard-login.services';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

    authPrms: string = '';

    constructor(private authGuard: AuthGuardLoign) { }


    @ViewChild('navmain') sidenav: MdSidenav;

    @Input()
    set showToggle(showToggle: boolean) {
        this.sidenav.toggle();
        console.log(showToggle);
    }

    ngOnInit(): void {
        this.authGuard.decodeToken()
            .subscribe(
                observer => {
                    console.log("OBserver", observer)
                    if ( observer['status']) {
                        this.authPrms = observer['payload']
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
