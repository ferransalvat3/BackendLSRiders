import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IEvent } from 'app/shared/model/event.model';

export interface IRatingEvent {
    id?: number;
    puntuacion?: number;
    valoracion?: string;
    date?: Moment;
    user?: IUser;
    event?: IEvent;
}

export class RatingEvent implements IRatingEvent {
    constructor(
        public id?: number,
        public puntuacion?: number,
        public valoracion?: string,
        public date?: Moment,
        public user?: IUser,
        public event?: IEvent
    ) {}
}
