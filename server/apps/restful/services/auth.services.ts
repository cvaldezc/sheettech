import * as fetch from 'node-fetch';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';

import { config } from '../../../config.server';


export class TokenServices {

    /**
     * createToken
     */
    public static createToken(user: any) {
        // tslint:disable-next-line:prefer-const
        let payload: object = {
            sub: user.auth,
            iat: moment().unix(),
            exp: moment().add(15, 'days').unix()
        };
        return jwt.sign(payload, config.SECRET_TOKEN);
    }

    /**
     * verifyToken
     */
    public static verifyToken(token: string) {
        // tslint:disable-next-line:prefer-const
        let decode = new Promise( (resolve, reject) => {
            try {
                // tslint:disable-next-line:prefer-const
                let payload: any = jwt.verify(token, config.SECRET_TOKEN);
                if (payload.exp <= moment().unix()) {
                    reject({
                        scode: 401,
                        status: false,
                        raise: 'Token is expired'
                    });
                }
                resolve({
                    status: true,
                    payload: payload.sub
                });
            } catch (error) {
                reject({
                    code: 500,
                    status: false,
                    raise: `Token invalid ${error}`
                });
            }
        });
        return decode;
    }

    /**
     * ComparePassword
     */
    public static verifyPassword(auth: any) {
        // tslint:disable-next-line:prefer-const
        let verify = new Promise( (resolve, reject) => {
            try {
                fetch(config.servicesAuth, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    compress: true,
                    body: auth
                })
                .then( res => res.json())
                .then( response => {
                    console.log(response);
                }).catch( err => {
                    reject({
                        code: 406,
                        status: false,
                        raise: err
                    });
                    console.log(err);
                });
            } catch (error) {
                reject({
                    code: 500,
                    status: false,
                    raise: error
                });
            }
        });
        return verify;
    }

}
