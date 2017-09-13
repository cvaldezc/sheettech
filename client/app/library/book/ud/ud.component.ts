import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs/Observable'

import { AuthServices } from '../../../services/auth/auth.service'
import { BrandService } from '../../../services/sheet/brand.service'
import { ModelService } from '../../../services/sheet/model.service'
import { SheetService } from '../../../services/sheet/sheet.service'


@Component({
    selector: 'udsheet',
    templateUrl: './ud.component.html'
})
export class UDComponent implements OnInit {

    brandCtrl: FormControl
    patternCtrl: FormControl
    filterBrand: Observable<Array<any>>
    filterPattern: Observable<Array<any>>
    brands: Array<any>
    patterns: Array<any>

    sheet: string = ''
    ud: object = {}

    constructor(
        private activatedRoute: ActivatedRoute,
        public userServ: AuthServices,
        private brServ: BrandService,
        private ptServ: ModelService,
        private sheetServ: SheetService
    )
    {
        this.activatedRoute.params.subscribe( (params: Params) => this.sheet = params['sheet'] )
    }

    ngOnInit(): void {
        this.brandCtrl = new FormControl()
        this.patternCtrl = new FormControl()
        this.sheetServ
            .getByID(this.sheet)
            .subscribe(
                (observer: any) => {
                    let _ud = observer
                    _ud['brand'] = _ud['brand']['brand']
                    _ud['pattern'] = _ud['pattern']['model']
                    this.ud = _ud
                },
                err => console.log(err)
            )
        this.sheetServ
            .getAttachment(this.sheet)
            .subscribe(
                observer => {
                    let preview: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById('preview')
                    preview.setAttribute('src', URL.createObjectURL(observer))
                },
                err => console.log(err)
            )

        this.brServ.getBrandRemote().subscribe(
             observer => this.brands = observer,
             err => console.log(err),
             () => {
                this.filterBrand = this.brandCtrl.valueChanges
                    .startWith(null)
                    .map(brand => brand && typeof brand == 'object' ? brand.brand : brand)
                    .map(valBrand => valBrand ? this.filteredBrand(valBrand) : this.brands)
             }
        )
        this.ptServ.getModelRemote().subscribe(
            observer => this.patterns = observer,
            err => console.log(err),
            () => {
                this.filterPattern = this.patternCtrl.valueChanges
                    .startWith(null)
                    .map(pattern => pattern && typeof pattern == 'object' ? pattern.model : pattern)
                    .map(valPattern => valPattern ? this.filteredPattern(valPattern) : this.patterns)
            }
        )

    }

    performUpdate(): void {
        this.validateForm().then( res => {
            let form = this.ud
            console.log(res, form)
        })
    }

    async validateForm(): Promise<boolean> {
        let valid: boolean = false
        let vbr: any
        let vpt: any
        let file: HTMLInputElement = <HTMLInputElement>document.getElementById('file')
        this.brServ.validate(this.ud['brand'], this.brands).subscribe( res => vbr = res, err => vbr = err )
        this.ptServ.validate(this.ud['pattern'], this.patterns).subscribe( res => vpt = res, err => vpt = err )
        if (typeof vbr == 'object') {
            this.ud['bid'] = vbr['brand_id']
            valid = await true
        } else
            valid = false
        if (valid && typeof vpt == 'object') {
            valid = await true
            this.ud['pid'] = vpt['model_id']
        } else
            valid = false
        if (valid && file.files.length) {
            valid = file.files[0].name.toLowerCase().trim().endsWith('pdf')
            if (valid)
                this.ud['file'] = file.files[0]
        }
        return await valid
    }

    filteredBrand(valBrand: string): Array<any> {
        return this.brands.filter((option) => new RegExp(`(${valBrand})`, 'gi').test(option.brand))
    }

    filteredPattern(valModel: string): Array<any> {
        return this.patterns.filter((option) => new RegExp(`(${valModel})`, 'gi').test(option.model))
    }

}