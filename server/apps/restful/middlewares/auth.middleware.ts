import { TokenServices } from '../services/auth.services';
import { Response, Request, NextFunction } from 'express';


export async function isAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization || req.headers.authorization == '') {
        return await res.status(403).json({status: false, raise: 'Middleware No tienes Autorización'});
    }

    let token = await req.headers.authorization.split(' ')[1];

    await TokenServices.verifyToken(token)
        .then( async (response) => {
            req['user'] = await response;
            // console.log(response)
            await next();
        }).catch( error => {
            // console.log(error);
            return res.status(error.scode).json(error);
        });
}


