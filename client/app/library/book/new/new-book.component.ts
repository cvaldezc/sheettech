import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { NotificationsService } from 'angular2-notifications';

import { BrandService } from '../../../services/sheet/brand.service';
import { IBrand } from '../../../../../server/apps/restful/interfaces/Brand.inteface';
import { ModelService } from '../../../services/sheet/model.service';
import { IModel } from '../../../../../server/apps/restful/interfaces/Model.interface';
import { DialogMaterial } from '../../search/master-remote.component';
import { ISheet } from "../../../../../server/apps/restful/interfaces/Sheet.interface";
import { UtilService } from '../../../services/util.service';
import { SheetService } from '../../../services/sheet/sheet.service';


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
    process: boolean = false
    loadProgress: number = 0

    sheet = {
        sheet: '',
        name: '',
        brand: '',
        model: '',
        bname: '',
        mname: ''}

    public options = {
        animate: 'scale',
        clickToClose: true,
        lastOnBottom: true,
        pauseOnHover: true,
        position: ['top', 'right'],
        showProgressBar: true,
        timeOut: 2600,
    }

    constructor(
        private sheetServ: SheetService,
        private brandServ: BrandService,
        private modelServ: ModelService,
        private notify: NotificationsService,
        public dialog: MdDialog) { }

    ngOnInit(): void {
        this.brandServ.getBrandRemote().subscribe(observer => this.brandLst = observer )
        this.brandCtrl = new FormControl()
        this.filteredBrands = this.brandCtrl.valueChanges
            .startWith(null)
            .map(brand => brand && typeof brand === 'object' ? brand.brand : brand)
            .map(name => name ? this.filterBrand(name) : this.brandLst)
        setTimeout( () =>
            this.modelServ.getModelRemote().subscribe(observer => this.modelLst = observer)
        , 800)
        this.modelCtrl = new FormControl()
        this.filteredModels = this.modelCtrl.valueChanges
            .startWith(null)
            .map(model => model && typeof model === 'object' ? model.model : model)
            .map(name => name ? this.filterModel(name) : this.modelLst)
    }

    openDialog() {
        let dialogRef = this.dialog.open(DialogMaterial, { width: '80%', height: 'auto', hasBackdrop: true });
        dialogRef.afterClosed().subscribe((result: string) => {
            let arrst: Array<string> = result.split('|@|')
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
            name: '',
            brand: '',
            model: '',
            bname: '',
            mname: ''}
        this.brandCtrl.setValue('')
        this.modelCtrl.setValue('')
        this.fileTech.nativeElement.value = ''
        this.filetext.nativeElement.value = ''
    }

    saveSheet(): void {
        this.validForm().then(result => {
            this.process = true
            if (result) {
                this.notify.html(`<md-icon class="fa-spin">data_usage</md-icon> Procesando...!`, 'alert', { timeOut: null, id: 'EySVcZStQ'})
                let form = new FormData()
                form = UtilService.convertToForm(this.sheet)
                form.append('file', this.fileTech.nativeElement.files[0])
                this.sheetServ.save(form).subscribe(
                    (event: any) => {
                        if (event.type === HttpEventType.UploadProgress) {
                            const percentDone = Math.round(100 * event.loaded / event.total);
                            this.loadProgress = percentDone
                            // console.log(`File is ${percentDone}% uploaded.`);
                        } else if (event instanceof HttpResponse) {
                            // console.log(event)
                            if (event.ok) {
                                // messge succeful
                                this.notify.success('Correcto!', 'El archivo se ha cargardo correctamente!')
                                // console.log('File is completely uploaded!');
                            } else {
                                this.notify.remove('EySVcZStQ')
                                // show raise
                                // console.log(event['body']['raise'])
                                this.notify.error('Error', `${event.body}`)
                            }
                            this.process = false
                        }
                    }, (err => {
                        if (err instanceof HttpErrorResponse) {
                            // console.log(err.error.raise)
                            this.notify.error('Error', `${err.error.raise}`, this.options)
                            this.process = false
                        }
                    })
                )
            } else {
                this.notify.alert('Alerta!', 'El formulario es invalido', this.options)
                this.process = false
            }
        })

    }

    private async validForm() {
        let isValid: boolean = true
        console.info(this.sheet.sheet, typeof this.sheet.sheet)
        if ( this.sheet.sheet === '') {
            this.notify.warn('Alerta', 'Seleccione un código valido!')
            isValid = await false
        }
        if (isValid) {
            isValid = await this.validBrand()
            if (!isValid) this.notify.warn('Alerta', 'Seleccione una marca de la lista')
        }
        if (isValid) {
            isValid = await this.validModel()
            if (!isValid) this.notify.warn('Alerta', 'Seleccione un modelo de la lista')
        }
        if (isValid) {
            if (this.fileTech.nativeElement.files.length) {
                let ext: Array<string> = this.fileTech.nativeElement.files[0].name.split('.')
                if (ext[ext.length - 1].toLowerCase() === 'pdf'){
                    isValid = await true
                }else{
                    isValid = await false
                    this.notify.warn('Alerta', 'El archivo tiene que ser en formato pdf!')
                }
            }else{
                isValid = await false
                this.notify.warn('Alerta', 'Seleccione un archivo')
            }
        }
        return await isValid
    }

    private async validBrand() {
        let valid: boolean = false
        this.brandLst.forEach( (brand, index) => {
            if (brand.brand === this.brandCtrl.value) {
                // console.log(brand.brand, this.brandCtrl.value)
                this.sheet.brand = brand.brand_id
                this.sheet.bname = brand.brand
                valid = true
                return
            }
        })
        return valid
    }

    private async validModel() {
        let valid: boolean = false
        this.modelLst.forEach( (model, index) => {
            if (model.model === this.modelCtrl.value) {
                console.log(model.model, this.modelCtrl.value)
                this.sheet.model = model.model_id
                this.sheet.mname = model.model
                valid = true
                return
            }
        })
        return valid
    }

    filterBrand(val: string) {
        return this.brandLst.filter((option: IBrand) =>
            new RegExp(`(${val})`, 'gi').test(option.brand))
    }


    filterModel(val: string) {
        return this.modelLst.filter((option: IModel) =>
            new RegExp(`(${val})`, 'gi').test(option.model))
    }

}
