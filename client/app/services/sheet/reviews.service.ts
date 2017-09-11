import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

import { HttpServices } from '../../services/http.Services'
import { IReviews } from '../../../../server/apps/restful/interfaces/Reviews.interface'


interface IReviewsService {
    save(params: object): Observable< IReviews >
    remove(params: object): Observable< boolean >
    update(params: object): Observable< IReviews >
}


@Injectable()
export class ReviewsService implements IReviewsService {

    constructor(
        private http: HttpClient,
        private httpServ: HttpServices
    ) {  }

    remove(params: object): Observable< boolean > {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'json'
        options['params'] = this.httpServ.setHttpParams()
        options['body'] = params
        return this.http.delete< boolean >('/restful/reviews/remove', options)
    }

    save(params: object): Observable< IReviews > {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'json'
        options['params'] = this.httpServ.setHttpParams()
        return this.http.post<IReviews>('/restful/reviews/save', params, options)
    }

    update(params: object): Observable< IReviews > {
        let options = this.httpServ.optionsRequest
        options['responseType'] = 'json'
        options['params'] = this.httpServ.setHttpParams()
        return this.http.put< IReviews >('/restful/reviews/update', params, options)
    }

}
