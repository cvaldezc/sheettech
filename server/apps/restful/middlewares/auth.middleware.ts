import { TokenServices } from '../services/auth.services';
import { Response, Request, NextFunction } from 'express';


export class AuthMiddleware {

    public static isAuth = (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers.authorization) {
            return res.status(403).json({status: false, raise: 'No tienes Autorización'});
        }
        // tslint:disable-next-line
        let token = req.headers.authorization.split(' ')[1];

        TokenServices.verifyToken(token)
            .then( response => {
                req['user'] = response;
                next();
            }).catch( error => {
                res.status(error.scode).json(error);
            });
    }

}

