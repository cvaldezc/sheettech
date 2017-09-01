import fetch from 'node-fetch';
import * as FormData from 'form-data';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { config } from '../../../config.server';
import { Auth } from "../models/auth.models";


export class TokenServices {

    /**
     * createToken
     */
    public static createToken(user: any) {
        // tslint:disable-next-line:prefer-const
        let payload: object = {
            sub: { auth: user.auth, isAdmin: (user.charge == 'Administrator' ? true : false) },
            iat: moment().unix(),
            exp: moment().add(15, 'days').unix()
        }
        return jwt.sign(payload, config.SECRET_TOKEN)
    }

    public static genToken(encode: string|object|any): string {
        let payload: object = {
            sub: encode,
            iat: moment().unix(),
            exp: moment().add(15, 'days').unix()
        }
        return jwt.sign(payload, config.SECRET_TOKEN)
    }

    /**
     * verifyToken
     */
    public static verifyToken(token: string) {
        let decode = new Promise( (resolve, reject) => {
            try {
                let payload: any = jwt.verify(token, config.SECRET_TOKEN);
                if (payload.exp <= moment().unix()) {
                    reject({
                        scode: 401,
                        status: false,
                        raise: 'Token is expired'
                    });
                }
                Auth.findOne({auth: payload.sub.auth }, (err, _auth) => {
                    if (_auth === null) {
                        resolve({
                            status: true,
                            payload: payload.sub
                        })
                    }else{
                        let _payload: any = payload.sub
                        _payload['user'] = _auth._id
                        resolve({
                            status: true,
                            payload: _payload
                        })
                    }
                })
            } catch (error) {
                reject({
                    scode: 500,
                    status: false,
                    raise: `Token invalid, cierre session y vuelva a internarlo ${error}`
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
                const data = new FormData();
                // tslint:disable-next-line
                for (let key in auth) {
                    data.append(key, auth[key]);
                }
                fetch(`${config.remoteservice}auth/`, {
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'multipart/form-data', // application/x-www-form-urlencoded
                    //     'Accept': 'application/json'},
                    compress: true,
                    body: data
                })
                .then( res => res.json())
                .then( response => {
                    // console.log(response);
                    resolve(response);
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
