import * as express from 'express';

import { AuthController } from '../restful/controllers/auth.controllers';
import { AuthMiddleware } from '../restful/middlewares/auth.middleware';


const AuthUrls = express.Router();

// routes for auth
// AuthUrls.get('/all', new AuthController().getAllDocuments);
// AuthUrls.get('/signin', new AuthController().SignIn);
AuthUrls.post('/decode', new AuthController().decodeToken);
AuthUrls.post('/signin', new AuthController().SignIn);

export { AuthUrls };
