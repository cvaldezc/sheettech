import * as express from 'express';

import { AuthController } from '../restful/controllers/auth.controllers';


const AuthUrls = express.Router();

// routes for auth
// AuthUrls.get('/all', new AuthController().getAllDocuments);
// AuthUrls.get('/signin', new AuthController().SignIn);
AuthUrls.post('/signin', new AuthController().SignIn);

export { AuthUrls };
