import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IMoto {
    id?: number;
    brand?: string;
    model?: string;
    cc?: number;
    year?: Moment;
    user?: IUser;
}

export class Moto implements IMoto {
    constructor(
        public id?: number,
        public brand?: string,
        public model?: string,
        public cc?: number,
        public year?: Moment,
        public user?: IUser
    ) {}
}
