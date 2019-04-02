import { IUser } from 'app/core/user/user.model';

export interface IUserExt {
    id?: number;
    phoneNumber?: string;
    student?: boolean;
    user?: IUser;
}

export class UserExt implements IUserExt {
    constructor(public id?: number, public phoneNumber?: string, public student?: boolean, public user?: IUser) {
        this.student = this.student || false;
    }
}
