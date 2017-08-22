import { TokenServices } from '../services/auth.services';
import { Response, Request, NextFunction } from 'express';


export function isAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization || req.headers.authorization == '') {
        return res.status(403).json({status: false, raise: 'No tienes Autorización'});
    }

    let token = req.headers.authorization.split(' ')[1];

    TokenServices.verifyToken(token)
        .then( response => {
            req['user'] = response;
            // console.log(response)
            next();
        }).catch( error => {
            // console.log(error);
            return res.status(error.scode).json(error);
        });
}


