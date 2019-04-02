import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IEvent } from 'app/shared/model/event.model';

export interface IParticipacionEvento {
    id?: number;
    fechaApuntado?: Moment;
    user?: IUser;
    event?: IEvent;
}

export class ParticipacionEvento implements IParticipacionEvento {
    constructor(public id?: number, public fechaApuntado?: Moment, public user?: IUser, public event?: IEvent) {}
}
