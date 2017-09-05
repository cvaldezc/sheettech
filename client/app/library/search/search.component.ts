import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map'

import { BrandService } from '../../services/sheet/brand.service';
import { IBrand } from '../../../../server/apps/restful/interfaces/Brand.inteface';
import { ModelService } from '../../services/sheet/model.service';
import { IModel } from '../../../../server/apps/restful/interfaces/Model.interface';



interface ISearchLibrary {
    code: string
    name: string
    brand: string
    pattern: string
}

@Component({
    selector: 'search-library',
    templateUrl: './search.component.html'
})
export class SearchLibraryComponent implements OnInit {

    // brand
    brandLst: Array<IBrand>
    brandCtrl: FormControl
    filterBrands: Observable<IBrand[]>
    // model
    modelLst: Array<IModel>
    modelCtrl: FormControl
    filterModels: Observable<IModel[]>

    search: ISearchLibrary = {
        code: '',
        name: '',
        brand: '',
        pattern: ''
    }
    isFind: boolean = false

    constructor(
        private bServ: BrandService,
        private mServ: ModelService
    ) { }

    ngOnInit(): void {
        this.bServ.getBrands().subscribe(observer => this.brandLst = observer)
        this.brandCtrl = new FormControl()
        this.filterBrands = this.brandCtrl.valueChanges
            // .startWith( null )
            .map(_brand => _brand && typeof _brand === 'object' ? _brand.brand : _brand)
            .map(_brand => _brand ? this.filterBrand(_brand) : this.brandLst)

        this.mServ.getModels().subscribe(observer => this.modelLst = observer)
        this.modelCtrl = new FormControl()
        this.filterModels = this.modelCtrl.valueChanges
            .map(_model => _model && typeof _model === 'object' ? _model.model : _model)
            .map(_model => _model ? this.filterModel(_model) : this.modelLst)
    }

    catchKeyEvent(event: KeyboardEvent): void {
        if ( event.keyCode === 13) {
            this.isFind = !this.isFind
        }
    }

    private filterBrand(_brand: string) {
        return this.brandLst.filter((option: IBrand) => new RegExp(`(${_brand})`, 'gi').test(option.brand))
    }

    private filterModel(_model: string): IModel[] {
        return this.modelLst.filter((option: IModel) => new RegExp(`(${_model})`, 'gi').test(option.model))
    }

    public displayBrand(brand: IBrand): string {
        let _strbrand: string = ''
        // console.log(brand, typeof brand)
        if (brand) {
            _strbrand = brand.brand
            this.search.brand = brand._id
        } else {
            console.log('here pattern');
            this.search.brand = ''
        }
        return _strbrand
    }

    public displayModel(model: IModel): string {
        let _strmodel: string = ''
        if (model) {
            _strmodel = model.model
            this.search.pattern = model._id
        } else {
            console.log('here pattern');
            this.search.pattern = ''
        }
        return _strmodel
    }

}
