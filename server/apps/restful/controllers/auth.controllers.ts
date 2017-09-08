import { Request, Response } from 'express';

import { IAuthModel } from '../interfaces/Auth.interface';
import { Auth } from '../models/auth.models';
import { TokenServices } from '../services/auth.services';
import { UtilsService } from '../utils/string.service';


export class AuthController {

    // model = Auth;

    /**
     * SignIn
     */
    public SignIn(req: Request, res: Response) {
        // console.log(req.body)
        // tslint:disable-next-line:prefer-const
        let passwd: string = req.body.passwd;
        // tslint:disable-next-line:prefer-const
        let usr: string = req.body.user;
        // tslint:disable-next-line:prefer-const
        let _auth = { passwd, usr };
        //console.log(_auth);
        TokenServices.verifyPassword(_auth)
        .then( (response: any) => {
            // console.log(response);
            let _status = response.status;
            if (_status) {
                Auth.findOne({ auth: response.auth }, (err, auth) => {
                    if (err) return res.status(500).json({ status: false, raise: err });

                    if (String(response.charge).toLowerCase() === 'administrator' && auth === null) {
                        let cauth = new Auth();
                        cauth.auth = response.auth;
                        cauth.email = response.email;
                        cauth.charge = response.charge;
                        cauth.name = UtilsService.strCapitalize(response.names);
                        cauth.isactive = true;
                        cauth.lastLogin = Date.now()
                        cauth.save( (err, user) => {
                            if (err) return res.status(500).json({ status: false, raise: err });

                            return res.status(200).json({ status: true, response, raise: 'Not register', token: TokenServices.createToken(user) });
                        } );
                    } else if (auth === null) {
                        return res.status(404).json({status: false, raise: 'El usuario no se encuentra registrado.'});
                    } else {
                        let token = TokenServices.createToken(auth); // req.user = auth;
                        auth.lastLogin = Date.now()
                        auth.save()
                        return res.status(200).json({status: true, token, 'permission': TokenServices.genToken(auth.permission)});
                    }
                });
            } else {
                res.status(206).send({status: _status, 'raise': response.raise });
            }
        })
        .catch( err => {
            res.status(401).json({status: false, valid: 'auth fail verify', raise: `${err.code} ${err.raise.message}`});
        });
    }


    /**
     * decodeToken
     */
    public decodeToken(req: Request, res: Response) {
        // console.log(req.body);
        if (!req.body.token) {
            return res.status(403).json({status: false, raise: 'Controller No tienes Autorización'});
        }
        let token = req.body.token.split(' ')[1];
        TokenServices.verifyToken(token)
            .then( response => {
                // req['user'] = response;
                return res.status(200).json(response);
            }).catch( error => {
                return res.status(301).json(error);
            });
    }

    /**
     * generateToken
     */
    public generateToken(req: Request, res: Response) {
        res.status(201).send({token: TokenServices.genToken(req.body['pre'])})
    }

    /**
     * getAuth
     * @param auth
     */
    public getAuth(req: Request, res: Response) {
        // console.log(req.query)
        Auth.findOne({auth: req.query['auth']}, {_id: 0}, (err, _auth: IAuthModel) => {
            if (err) return res.status(500).json({status: false, raise: err})
            if (!_auth) return res.status(404).json({status: false, raise: 'No se ha encontrado datos'})

            res.status(200).json(_auth)
        })
    }

    public getUsersRegister(req: Request, res: Response) {
        Auth.find({}, {_id: 0, permission: 0}, (err: any, auths: IAuthModel[]) => {
            if (err) return res.status(500).json({ raise: err })
            if (!auths) return res.status(404).json({ raise: 'No found auths' })

            res.status(200).json(auths)
        })
    }

    /**
     * savePermission
     */
    public updatePermission(req: Request, res: Response) {
        Auth.findOneAndUpdate({ auth: req.body['auth'] }, { 'permission': req.body['permission']}, (err, permission) => {
            if (err) return res.status(500).json({ status: false, raise: err })
            if (!permission) return res.status(404).json({ status: false, raise: 'Auth not found' })

            res.status(200).json({status: true, permission: req.body['permission'] })
        })
    }

    /**
     * getUID
     */
    public getUID(req: Request, res: Response) {
        // console.log('user auth middleware ', req['user']);

        Auth.findOne({ auth: req.body.auth }, { _id: 1 }, (err, rauth) => {
            if (err)
                return res.status(500).json({ raise: err })
            if (!rauth)
                return res.status(404).json({ raise: 'UID not Found' })
            res.status(200)
            res.write(`${rauth._id}`)
            res.end()
        })
    }

}

