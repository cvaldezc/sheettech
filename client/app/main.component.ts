import { Component } from '@angular/core';

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.sass']
})
export class MainComponent {

    toogle = false;

    test(): void {
        this.toogle = !this.toogle;
        console.log('Successful call function');
    }

}

