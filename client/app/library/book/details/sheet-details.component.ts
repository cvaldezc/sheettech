import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// import { HttpResponse } from '@angular/common/http';

import { SheetService } from '../../../services/sheet/sheet.service';


@Component({
    selector: 'sheet-details-view',
    templateUrl: './sheet-details.component.html'
})
export class SheetDetailsComponent implements OnInit {

    @ViewChild('sheetfile') sheetfile: ElementRef

    _sheet: string

    constructor(
        private activatedRouter: ActivatedRoute,
        private sheetServ: SheetService
    ) {  }

    ngOnInit(): void {
        this.activatedRouter.params.subscribe( (params: Params) => {
            this._sheet = params['sheet']
            this.getAttachment()
            // this.sheetfile.nativeElement.src = `/restful/sheet/attachment/${this._sheet}`
        })
    }

    /**
     * get Attachment
     */
    public getAttachment() {
        return this.sheetServ.getAttachment(this._sheet)
            .subscribe( response => {
                console.log(response);

                let file = new Blob([response], { type: 'application/pdf' })
                // let file = window.URL.createObjectURL(response)
                console.log(file)
                this.sheetfile.nativeElement.src = URL.createObjectURL(file)
                // `/restful/sheet/attachment/${this._sheet}`
            })
    }

}