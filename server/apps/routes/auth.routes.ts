import * as express from 'express';

import { AuthController } from '../restful/controllers/auth.controllers';


const AuthUrls = express.Router();

// routes for auth
AuthUrls.get('/all', new AuthController().getAllDocuments);

export { AuthUrls };
