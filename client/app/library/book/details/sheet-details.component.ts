import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SheetService } from '../../../services/sheet/sheet.service';
import { ISheet } from '../../../../../server/apps/restful/interfaces/Sheet.interface';


@Component({
    selector: 'sheet-details-view',
    templateUrl: './sheet-details.component.html'
})
export class SheetDetailsComponent implements OnInit {

    @ViewChild('sheetfile') sheetfile: ElementRef

    _sheet: string
    urlSheet: string
    sheetData: ISheet = <any>{
        sheet: '',
        name: '',
        brand: <any>{ brand: '', bid: ''},
        pattern: <any>{ mid: '', model: '' },
        rate: 0,
        auth: <any>{ auth: '', email: '', name: '', isactive: false},
    }

    constructor(
        private activatedRouter: ActivatedRoute,
        private sheetServ: SheetService
    ) {  }

    ngOnInit(): void {
        this
            .activatedRouter.params
            .subscribe( (params: Params) => {
                this._sheet = params['sheet']
                this.getData()
                this.getAttachment()
            })
    }

    /**
     * getData
     */
    public getData(): void {
        this.sheetServ.getByID(this._sheet)
            .subscribe( response => this.sheetData = response )
    }

    /**
     * get Attachment
     */
    public getAttachment(): void {
        this.
            sheetServ
            .getAttachment(this._sheet)
            .subscribe( response => {
                this.urlSheet = URL.createObjectURL(response)
                this.sheetfile.nativeElement.src = this.urlSheet
            })
    }

    /**
     * downloadSheet
     */
    public downloadSheet(): void {
        window.open(this.urlSheet)
    }

    /**
     * getRelated
     */
    public getRelated(): void {
        this.sheetServ.findSheetRelated({sheet: this._sheet, limit: 5})
            .subscribe( response => {
                console.log(response)
            },
            ( err => {
                console.warn(err);
            })
        )
    }

}