import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SheetService } from '../../../services/sheet/sheet.service';
import { ISheet } from '../../../../../server/apps/restful/interfaces/Sheet.interface';
import { UtilService } from '../../../services/util.service';
import { AuthServices } from '../../../services/auth/auth.service';


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
    _related: ISheet[] = <any>[]

    constructor(
        private activatedRouter: ActivatedRoute,
        private sheetServ: SheetService,
        private authServ: AuthServices
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
            .subscribe( response => {
                this.sheetData = response
                this.getRelated()
            })
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
        this.sheetServ
            .findSheetRelated({
                sid: this._sheet,
                sheet: this.sheetData.sheet,
                limit: 5
            })
            .subscribe( response => {
                this._related = response
                // console.log( 'show related ', response)
            },
            ( err => {
                console.info(err);
            })
        )
    }

    /**
     * saveReting
     */
    public saveReting(): void {
        let params = { auth: this.authServ._auth }
        this.sheetServ.saveRate(params)
            .subscribe( res => {
                console.log(res)
            })
    }

    test(): void {
        this.sheetServ.test().subscribe(
            val => console.log('Test val ', val),
            err => console.log('Test err ', err)
        )
    }

}