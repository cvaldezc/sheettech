import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SheetService } from '../../../services/sheet/sheet.service';
import { ISheet } from '../../../../../server/apps/restful/interfaces/Sheet.interface';
import { UtilService } from '../../../services/util.service';
import { AuthServices } from '../../../services/auth/auth.service';
import { IPermission } from '../../../../../server/apps/restful/interfaces/Permission.interface';


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
    star: number = 0
    _favorite: boolean = false

    constructor(
        private activatedRouter: ActivatedRoute,
        private sheetServ: SheetService,
        private authServ: AuthServices,
        private router: Router
    ) { }

    ngOnInit(): void {
        this
            .activatedRouter.params
            .subscribe( (params: Params) => {
                this._sheet = params['sheet']
                this.getData()
                this.getAttachment()
                this.getRating()
                setTimeout(() => {
                    this.checkedFavorite()
                }, 800);
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
            },
            err => this.router.navigate(['notfound'])
        )
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
                limit: 3
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
    public saveReting(star: number): void {
        if (this.authServ.permission.write) {
            let params = { star: star, sheet: this._sheet, auth: this.authServ._uid }
            if ( this.authServ.permission.write ) {
                this.sheetServ.saveRate(params)
                    .subscribe(
                        res => {
                            console.log('RES Rating ', res)
                            this.getRating()
                        },
                        err => console.log(err)
                    )
            } else {
                console.log(' Nothing permission for write ');
            }
        }
    }

    public getRating(): void {
        this
            .sheetServ
            .getRatingbySheet(this._sheet)
            .subscribe( star => this.star = star )
    }

    /**
     * checkedFavorite
     */
    public checkedFavorite() {
        this.sheetServ
            .getFavorite(this.authServ._uid, this._sheet)
            .subscribe( (_fav) => this._favorite = _fav, err => console.log(err))
    }

    /**
     * favoriteSave
     */
    public favoriteSave() {
        if ( !this._favorite ){
            this.sheetServ.favoriteSave(this.authServ._uid, this._sheet)
            .subscribe( res => this.checkedFavorite(), err => console.log(err) )
        } else {
            this.sheetServ.favoriteRemove(this.authServ._uid, this._sheet)
            .subscribe( res => this._favorite = res, err => console.log(err))
        }
    }

    test(): void {
        this.sheetServ.test().subscribe(
            val => console.log('Test val ', val),
            err => console.log('Test err ', err)
        )
    }

}