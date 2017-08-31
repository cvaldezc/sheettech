import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HttpServices } from '../http.Services';
import { IBrand } from '../../../../server/apps/restful/interfaces/Brand.inteface';


interface IBrandService {
    getBrandRemote(): Observable<IBrand[]>;
}

@Injectable()
export class BrandService implements IBrandService {

    constructor(
        private http: HttpClient,
        private httpServ: HttpServices) { }


    getBrandRemote(): Observable<IBrand[]> {
        return this.http.get<IBrand[]>('/restful/brand/remote/all', this.httpServ.optionsRequest)
    }

}