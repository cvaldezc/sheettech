import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.sass']
})
export class ToolBarComponent {
    // navToggle: EventEmitter<boolean>;

    constructor(private router: Router) { }

    @Output() navToggle = new EventEmitter<boolean>();
    navOpen() {
        this.navToggle.emit(true);
      }

    sendLogout(): void {
        this.router.navigate(['logout', { outlets: { 'data': null}}]);
    }

}
