import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IRatingEvent } from 'app/shared/model/rating-event.model';
import { IPuntsClau } from 'app/shared/model/punts-clau.model';
import { IParticipacionEvento } from 'app/shared/model/participacion-evento.model';

export interface IEvent {
    id?: number;
    name?: string;
    gpxContentType?: string;
    gpx?: any;
    kmRoute?: number;
    timeRoute?: number;
    date?: Moment;
    descripction?: string;
    observacionsPrev?: string;
    creador?: IUser;
    ratings?: IRatingEvent[];
    punts?: IPuntsClau[];
    participacions?: IParticipacionEvento[];
}

export class Event implements IEvent {
    constructor(
        public id?: number,
        public name?: string,
        public gpxContentType?: string,
        public gpx?: any,
        public kmRoute?: number,
        public timeRoute?: number,
        public date?: Moment,
        public descripction?: string,
        public observacionsPrev?: string,
        public creador?: IUser,
        public ratings?: IRatingEvent[],
        public punts?: IPuntsClau[],
        public participacions?: IParticipacionEvento[]
    ) {}
}
