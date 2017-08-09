interface IUsers {
    firstname: string;
    lastname: string;
    email: string;
}

export class UserModels {

    constructor(public user: IUsers) { }

}
