import * as express from 'express';

import { AuthController } from '../restful/controllers/auth.controllers';
import { AuthMiddleware } from '../restful/middlewares/auth.middleware';


const AuthUrls = express.Router();

// routes for auth

AuthUrls.post('/decode', new AuthController().decodeToken);
AuthUrls.post('/signin', new AuthController().SignIn);

AuthUrls.get('/permission', new AuthController().getPermission)

export { AuthUrls };
