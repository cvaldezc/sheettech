import { Component, Input, OnInit } from '@angular/core'

import { SheetService } from '../../../services/sheet/sheet.service'
import { AuthServices } from '../../../services/auth/auth.service'


@Component({
    selector: 'sheet-reviews',
    templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

    /* input variable */
    @Input('sheet') _sheet: string = ''

    _boxcomment: boolean = false
    comment: string = ''

    constructor(
        private sheetServ: SheetService,
        private userServ: AuthServices
    ) {  }


    ngOnInit(): void {
        console.log('init reviews', this._sheet);

    }

}