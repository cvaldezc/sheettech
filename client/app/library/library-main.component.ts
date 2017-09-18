import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: '<section><router-outlet></router-outlet></section>'
})
export class LibraryMainComponent {

    constructor(private router: Router) {
        if (this.router.url === '/home/library') {
            this.router.navigate(['/home', 'library', 'sheet'])
        }
     }

    // ngOnInit(): void {

    // }

}