import { BaseController } from '../services/index.controllers';
import { Auth } from '../models/auth.models';

export class AuthController extends BaseController {

    model = Auth;

    constructor() {
        super();
    }
}

