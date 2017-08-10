import { UserModels } from './user.models';

interface IAuth {
    password: string;
    lastLogin: Date;
    accountregister: Date;
}

export class AuthModels extends UserModels {

    constructor(public auth: IAuth) {
        super(null);
    }


}
