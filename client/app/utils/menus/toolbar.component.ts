import { Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolBarComponent {
    // navToggle: EventEmitter<boolean>;

    @Output() navToggle = new EventEmitter<boolean>();
    navOpen() {
        this.navToggle.emit(true);
      }

 }
