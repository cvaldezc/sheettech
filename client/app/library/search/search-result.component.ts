import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable';

import { SheetService } from '../../services/sheet/sheet.service';
import { ISheet } from '../../../../server/apps/restful/interfaces/Sheet.interface';
import { AuthServices } from '../../services/auth/auth.service';
import { IPermission } from '../../../../server/apps/restful/interfaces/Permission.interface';


@Component({
    selector: 'search-result',
    templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnInit {

    @Input('code') mcode: string
    @Input('name') mname: string
    @Input('brand') mbrand: string
    @Input('pattern') mpattern: string

    @Input()
    set showData(isFind: boolean) {
        // console.info(isFind);
        this.findResult()
    }

    /* variables globales */
    sheetList: ISheet[]
    _permission: IPermission
    showFilter: boolean = false

    constructor(
        private sheetServ: SheetService,
        private authServ: AuthServices
    ) {
        this._permission = this.authServ.permission
     }

    ngOnInit(): void {
        console.info(this._permission);
    }

    findResult(): void {
        let pfind: any = {
            sheet: this.mcode,
            name: this.mname,
            brand: this.mbrand,
            pattern: this.mpattern
        }
        // console.log(pfind)
        if ( this.mcode || this.mname || this.mbrand || this.mpattern )
            {
                this.sheetServ.finds(pfind)
                .subscribe( res => {
                    console.log(res)
                    this.sheetList = res
                })
            }
    }

}