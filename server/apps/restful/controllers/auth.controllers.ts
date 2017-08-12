import { Request, Response } from 'express';

import { BaseController } from '../services/base.services';
import { Auth } from '../models/auth.models';
import { TokenServices } from '../services/auth.services';

export class AuthController extends BaseController {

    model = Auth;

    /**
     * SignIn
     */
    public static SignIn(req: Request, res: Response) {
        // tslint:disable-next-line:prefer-const
        let passwd: string = req.body.passwd;
        // tslint:disable-next-line:prefer-const
        let usr: string = req.body.passwd;
        // tslint:disable-next-line:prefer-const
        let _auth = { passwd, usr };
        TokenServices.verifyPassword(_auth)
        .then( response => {
            console.log(response);
            res.status(200).send({status: true, valid: 'auth verify'});
            // res.status(200).send({token: TokenServices.createToken(this.model)});
        })
        .catch( err => {
            console.log(err);
            res.status(401).send({status: false, valid: 'auth fail verify'});
        });
    }


}

