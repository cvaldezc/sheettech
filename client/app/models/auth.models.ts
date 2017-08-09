import { User } from './user.models';

interface IAuth {
    password: string;
    lastLogin: Date;
    accountregister: Date;
}

export class AuthModels extends User {

    constructor(public auth: IAuth) {
        super(null);
    }


}
