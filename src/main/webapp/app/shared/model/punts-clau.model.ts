import { IEvent } from 'app/shared/model/event.model';

export interface IPuntsClau {
    id?: number;
    observation?: string;
    latitud?: number;
    longitud?: number;
    type?: string;
    event?: IEvent;
}

export class PuntsClau implements IPuntsClau {
    constructor(
        public id?: number,
        public observation?: string,
        public latitud?: number,
        public longitud?: number,
        public type?: string,
        public event?: IEvent
    ) {}
}
