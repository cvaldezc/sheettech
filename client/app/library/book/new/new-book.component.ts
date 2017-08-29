import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { BrandService } from '../../../services/sheet/brand.service';
import { IBrand } from '../../../../../server/apps/restful/interfaces/Brand.inteface';
import { ModelService } from '../../../services/sheet/model.service';
import { IModel } from '../../../../../server/apps/restful/interfaces/Model.interface';
import { DialogMaterial } from '../../search/master-remote.component';
import { ISheet } from "../../../../../server/apps/restful/interfaces/Sheet.interface";


@Component({
    selector: 'add-book',
    templateUrl: './new-book.component.html'
})
export class NewBookComponent implements OnInit {

    @ViewChild('fileTech') fileTech: ElementRef
    @ViewChild('filetext') filetext: ElementRef

    // brand
    brandLst: Array<IBrand>
    brandCtrl: FormControl
    filteredBrands: Observable<IBrand[]>
    // model
    modelLst: Array<IModel>
    modelCtrl: FormControl
    filteredModels: Observable<IModel[]>

    sheet = {
        sheet: '',
        name: ''}

    constructor(
        private brandServ: BrandService,
        private modelServ: ModelService,
        public dialog: MdDialog) { }

    ngOnInit(): void {
        this.sheet = {
            sheet: '',
            name: ''
        }
        this.brandServ.getBrandRemote()
            .subscribe(observer => {
                this.brandLst = observer
            }, err => {
                console.log(err)
            })
        this.brandCtrl = new FormControl()
        // console.log(this.brandCtrl)
        this.filteredBrands = this.brandCtrl.valueChanges
            .startWith(null)
            .map(brand => brand && typeof brand === 'object' ? brand.brand : brand)
            .map(name => name ? this.filterBrand(name) : this.brandLst)
        this.modelServ.getModelRemote().subscribe(observer => this.modelLst = observer)
        this.modelCtrl = new FormControl()
        this.filteredModels = this.modelCtrl.valueChanges
            .startWith(null)
            .map(model => model && typeof model === 'object' ? model.model : model)
            .map(name => name ? this.filterModel(name) : this.modelLst)
    }

    openDialog() {
        let dialogRef = this.dialog.open(DialogMaterial, { width: '80%', height: 'auto', hasBackdrop: true });
        dialogRef.afterClosed().subscribe((result: string) => {
            let arrst: Array<string> = result.split(',')
            console.log(arrst.length, arrst)
            if (arrst.length === 2) {
                this.sheet.sheet = arrst[0];
                this.sheet.name = arrst[1];
                console.info(this.sheet)
            } else {
                console.log('nothing selected ', result)
            }
        });
    }


    cleanFields(): void {
        this.sheet = {
            sheet: '',
            name: ''
        }
        this.brandCtrl.setValue('')
        this.modelCtrl.setValue('')
        this.fileTech.nativeElement.value = ''
        this.filetext.nativeElement.value = ''
    }

    saveSheet(): void {
        // console.log(this.validForm())
        this.validForm().then(result => console.info(result))
    }

    async validForm() {
        let isValid: boolean = true
        if ( this.sheet.sheet.trim() === '') {
            isValid = await false
        }
        if (isValid) {
            await this.brandLst.forEach( (brand, index) => {
                if (brand.brand == this.brandCtrl.value) {
                    isValid = true
                }
            })
        }
        if (isValid) {
            await this.modelLst.forEach( (model, index) => {
                if (model.model == this.modelCtrl.value) {
                    isValid = true
                }
            })
        }
        if (isValid) {
            if (this.fileTech.nativeElement.files.length) {
                let ext: Array<string> = this.fileTech.nativeElement.files[0].name.split('.')
                if (ext[ext.length - 1].toLowerCase() === 'pdf'){
                    isValid = true
                }else{
                    isValid = false
                }
            }else{
                isValid = false
            }
        }
        return isValid
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
