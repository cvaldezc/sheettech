import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.sass']
})
export class ToolBarComponent {

    constructor(private router: Router) { }

    @Output() navToggle = new EventEmitter<boolean>();
    navOpen() {
        this.navToggle.emit(true);
      }

    sendLogout(): void {
        location.href = '/home/logout';
    }

}
