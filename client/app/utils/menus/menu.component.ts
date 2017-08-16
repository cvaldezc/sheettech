import { Component, Input, OnChanges, SimpleChanges, SimpleChange, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent {

    @ViewChild('navmain') sidenav: MdSidenav;

    @Input()
    set showToggle(showToggle: boolean) {
        this.sidenav.toggle();
        console.log(showToggle);
    }
    // ngOnChanges(changes: SimpleChanges): void {
    //     const view: SimpleChange = changes.showToggle;
    //     // console.log('another msg', view);

    // }


 }
