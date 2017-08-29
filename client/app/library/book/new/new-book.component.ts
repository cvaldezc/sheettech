import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { BrandService } from '../../../services/sheet/brand.service';
import { IBrand } from '../../../../../server/apps/restful/interfaces/Brand.inteface';
import { ModelService } from '../../../services/sheet/model.service';
import { IModel } from '../../../../../server/apps/restful/interfaces/Model.interface';


@Component({
    selector: 'add-book',
    templateUrl: './new-book.component.html'
})
export class NewBookComponent implements OnInit {
    // brand
    brandLst: Array<IBrand>
    brandCtrl: FormControl
    filteredBrands: Observable<IBrand[]>
    // model
    modelLst: Array<IModel>
    modelCtrl: FormControl
    filteredModels: Observable<IModel[]>

    constructor(
        private brandServ: BrandService,
        private modelServ: ModelService) {  }
s
    ngOnInit(): void {
        this.brandServ.getBrandRemote()
            .subscribe( observer => {
                this.brandLst = observer
            }, err => {
                console.log(err)
            })
        this.brandCtrl = new FormControl()
        // console.log(this.brandCtrl)
        this.filteredBrands = this.brandCtrl.valueChanges
            .startWith(null)
            .map(brand => brand && typeof brand === 'object' ? brand.brand : brand)
            .map(name => name ? this.filterBrand(name) : this.brandLst )
        this.modelServ.getModelRemote().subscribe( observer => this.modelLst = observer)
        this.modelCtrl = new FormControl()
        this.filteredModels = this.modelCtrl.valueChanges
        .startWith(null)
        .map(model => model && typeof model === 'object' ? model.model : model)
        .map(name => name ? this.filterModel(name) : this.modelLst)
    }

    filterBrand(val: string) {
        // console.log(val)
        return this.brandLst.filter((option: IBrand) => new RegExp(`^${val}`, 'gi').test(option.brand))
    }

    displayFnBrand(_brand: IBrand): string { // set value for selected
        return _brand ? _brand.brand : '';
    }

    filterModel(val: string) {
        return this.modelLst.filter((option: IModel) => new RegExp(`^${val}`, 'gi').test(option.model))
    }

    displayfnModel(_model: IModel): string { // set value model
        return _model ? _model.model : ''
    }

}
