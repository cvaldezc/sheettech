import { Component, OnInit } from '@angular/core'

// import { AuthServices } from './services/auth/auth.service'

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

    toogle = false

    // constructor(private userServ: AuthServices) {}

    ngOnInit(): void {
        // this.userServ.
    }

    test(): void {
        this.toogle = !this.toogle;
        // console.log('Successful call function');
    }

}

