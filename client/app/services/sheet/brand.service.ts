import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'

import { HttpServices } from '../http.Services'
import { IBrand } from '../../../../server/apps/restful/interfaces/Brand.inteface'


interface IBrandService {
    getBrandRemote(): Observable<IBrand[]>
    getBrands(): Observable<IBrand[]>
    validate(brand: string, lstBrand: Array<IBrand>): Observable<IBrand | boolean>
}

@Injectable()
export class BrandService implements IBrandService {

    constructor(
        private http: HttpClient,
        private httpServ: HttpServices) { }


    getBrandRemote(): Observable<IBrand[]> {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'json'
        return this.http.get<IBrand[]>('/restful/brand/remote/all', options)
    }

    getBrands(): Observable<IBrand[]> {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'json'
        return this.http.get<IBrand[]>('/restful/brand/all', options)
    }

    validate(brand: string, lstBrand: Array<IBrand>): Observable<boolean|IBrand> {
        return Observable.create( (observer: Observer<any>) =>{
            let index: number = lstBrand.findIndex( (_brand) => typeof _brand == 'object' ? new RegExp(`\\b${brand}\\b`).test(_brand.brand) : false )
            if (index >= 0) {
                observer.next(lstBrand[index])
            } else {
                observer.error(false)
            }
            observer.complete()
        } )
    }

}