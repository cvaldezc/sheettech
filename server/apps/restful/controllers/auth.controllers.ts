import { Request, Response } from 'express';

import { BaseController } from '../services/base.services';
import { Auth } from '../models/auth.models';
import { TokenServices } from '../services/auth.services';


export class AuthController {

    // model = Auth;

    /**
     * SignIn
     */
    public SignIn(req: Request, res: Response) {
        // tslint:disable-next-line:prefer-const
        let passwd: string = req.body.passwd;
        // tslint:disable-next-line:prefer-const
        let usr: string = req.body.user;
        // tslint:disable-next-line:prefer-const
        let _auth = { passwd, usr };
        console.log(_auth);
        TokenServices.verifyPassword(_auth)
        .then( (response: any) => {
            console.log(response);
            // tslint:disable-next-line
            let _status = response.status;
            if (_status) {
                Auth.findOne({ auth: response.auth }, (err, auth) => {
                    if (err) {
                        return res.status(500).json({ status: false, raise: err });
                    }
                    if (String(response.charge).toLocaleLowerCase() === 'administrator' && auth === null) {
                        const cauth = new Auth();
                        cauth.auth = response.auth;
                        cauth.email = response.email;
                        cauth.charge = response.charge;
                        cauth.save();
                        // tslint:disable-next-line:max-line-length
                        return res.status(200).json({ status: true, response, raise: 'Not register', token: TokenServices.createToken(cauth) });
                    }
                    if (auth === null) {
                        return res.status(404).json({status: false, raise: 'El usuario no se encuentra registrado.'});
                    }
                    // tslint:disable-next-line
                    let token = TokenServices.createToken(auth); // req.user = auth;
                    return res.status(200).json({status: true, token});
                });
            } else {
                res.status(206).send({status: _status, 'raise': response.raise });
            }
        })
        .catch( err => {
            res.status(401).send({status: false, valid: 'auth fail verify', err});
        });
    }

}

