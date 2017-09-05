import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable';

import { SheetService } from '../../services/sheet/sheet.service';
import { ISheet } from '../../../../server/apps/restful/interfaces/Sheet.interface';


@Component({
    selector: 'search-result',
    templateUrl: './search-result.component.html'
})
export class SearchResultComponent {

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
    sheetList: Observable< ISheet[] >

    constructor(private sheetServ: SheetService) {  }

    findResult(): void {
        let pfind: any = {
            sheet: this.mcode,
            name: this.mname,
            brand: this.mbrand,
            pattern: this.mpattern
        }
        // console.log(pfind)
        if ( this.mcode || this.mname || this.mbrand || this.mpattern )
            this.sheetList = this.sheetServ.finds(pfind)
    }

}