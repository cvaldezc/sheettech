import * as express from 'express';

import { AuthController } from '../restful/controllers/auth.controllers';
import { isAuth } from '../restful/middlewares/auth.middleware';


const AuthUrls = express.Router();

// routes auth
AuthUrls.post('/signin', new AuthController().SignIn)
AuthUrls.post('/decode', new AuthController().decodeToken)
AuthUrls.get('/all', new AuthController().getUsersRegister)
AuthUrls.post('/gentoken', new AuthController().generateToken)
// Permissions
AuthUrls.put('/permission', isAuth, new AuthController().updatePermission)
AuthUrls.get('', new AuthController().getAuth)

export { AuthUrls };
