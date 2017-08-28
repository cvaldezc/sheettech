import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: '<section><router-outlet></router-outlet></section>'
})
export class LibraryMainComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        // this.router.navigate(['/home', 'library', 'sheet'])
    }

}