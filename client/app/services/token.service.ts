/**
 * Token
 */
import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';
import * as moment from "moment";


export class TokenService {

    /**
     * Decode token when is valid
     */
    public decodedTokenLocal(keyName: string = 'token'): Observable<{}> {
        let decode: Observable<{}> = Observable.create(
            ( observer ) => {
                try {
                    let token: string = localStorage.getItem(keyName)
                    if (token.split(' ').length > 1) {
                        token = token.split(' ')[1]
                    }
                    let payload: any = <any>jwt_decode(token)
                    if (payload.exp <= moment().unix()) {
                        observer.next({ status: false, raise: 'Token is Expired' })
                    }else{
                        observer.next({ status: true, payload: payload.sub })
                    }
                    observer.complete()
                } catch (error) {
                    observer.next({ status: false, raise: 'Token invalid, close session in the browser' })
                    observer.complete()
                }
            }
        )
        return decode
    }

    /**
     * decodeTokenRemote
     */
    public decodeTokenRemote(keyName: string = 'token'): Observable<{}> {
        try {
            return Observable.create( observer => {
                let token: string = localStorage.getItem(keyName)
                fetch('/restful/auth/token')
                    .then( (res: Response) => {
                        observer.next(res.body)
                        observer.complete()
                    })
                    .catch( err => {
                        observer.next({ status: false, raise: 'Token invalid, close session in the browser' })
                        observer.complete()
                    })
            })
        } catch (error) {
            return Observable.create(observer => {
                observer.next({ status: false, raise: 'Token invalid, close session in the browser' })
                observer.complete()
            })
        }
    }

}