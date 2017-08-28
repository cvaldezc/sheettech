import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { BrandService } from '../../../services/sheet/brand.service';
import { IBrand } from '../../../../../server/apps/restful/interfaces/Brand.inteface';

@Component({
    selector: 'add-book',
    templateUrl: './new-book.component.html'
})
export class NewBookComponent implements OnInit {

    brandLst: Observable<IBrand[]>
    brandCtrl: FormControl
    filteredBrands: any

    constructor(private brandServ: BrandService) {
        this.brandCtrl = new FormControl()
        this.brandLst = this.brandCtrl.valueChanges
            .map(name => this.filterBrand(name))
     }

    ngOnInit(): void {
        this.brandServ.getBrandRemote()
            .subscribe( observer => {
                this.brandLst = Observable.create( observ => {
                    observ.next(observer)
                    observ.complete()
                })
            }, err => {
                console.log(err)
            })
    }

    filterBrand(val: string) {
        console.log(val)
        return this.brandLst.filter(s => new RegExp(`^${val}`, 'gi').test(''))
    }

    displayFn(_brand: IBrand): string {
        return _brand ? _brand.brand : _brand.brand;
     }

}
