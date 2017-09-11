import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'

import { HttpServices } from '../http.Services'
import { IFavorite } from '../../../../server/apps/restful/interfaces/Favorite.interface'


interface IFavoriteService {
    getFavorite(auth: string, sheet: string): Observable< boolean >
    favoriteSave(auth: string, sheet: string): Observable< any >
    favoriteRemove(auth: string, sheet: string): Observable< boolean >
}

@Injectable()
export class FavoriteService implements IFavoriteService {

    constructor(
        public http: HttpClient,
        public httpServ: HttpServices
    ) {  }

    /**
     * getFavorite
     */
    public getFavorite(auth: string, sheet: string): Observable< boolean > {
        let options = this.httpServ.optionsRequest
        options.params = this.httpServ.setHttpParams()
        options['responseType'] = 'json'
        return this.http.get<boolean>(`/restful/sheet/favorite/${auth}/${sheet}`, options)
    }

    /**
     * favoriteSave
     */
    public favoriteSave(auth: string, sheet: string): Observable< any > {
        let options = this.httpServ.optionsRequest
        options.params = this.httpServ.setHttpParams()
        options['responseType'] = 'json'
        return this.http.post('/restful/sheet/save/favorite', {auth: auth, sheet: sheet}, options)
    }

    /**
     * rmFavorite
     */
    public favoriteRemove(auth: string, sheet: string): Observable< boolean > {
        let options = this.httpServ.optionsRequest
        options.params = this.httpServ.setHttpParams()
        options['responseType'] = 'json'
        return this.http.post<boolean>('/restful/sheet/remove/favorite',
            {auth: auth, sheet: sheet}, options)
    }

}
