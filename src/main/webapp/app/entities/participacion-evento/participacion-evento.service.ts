import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParticipacionEvento } from 'app/shared/model/participacion-evento.model';

type EntityResponseType = HttpResponse<IParticipacionEvento>;
type EntityArrayResponseType = HttpResponse<IParticipacionEvento[]>;

@Injectable({ providedIn: 'root' })
export class ParticipacionEventoService {
    public resourceUrl = SERVER_API_URL + 'api/participacion-eventos';

    constructor(protected http: HttpClient) {}

    create(participacionEvento: IParticipacionEvento): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(participacionEvento);
        return this.http
            .post<IParticipacionEvento>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(participacionEvento: IParticipacionEvento): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(participacionEvento);
        return this.http
            .put<IParticipacionEvento>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IParticipacionEvento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IParticipacionEvento[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(participacionEvento: IParticipacionEvento): IParticipacionEvento {
        const copy: IParticipacionEvento = Object.assign({}, participacionEvento, {
            fechaApuntado:
                participacionEvento.fechaApuntado != null && participacionEvento.fechaApuntado.isValid()
                    ? participacionEvento.fechaApuntado.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fechaApuntado = res.body.fechaApuntado != null ? moment(res.body.fechaApuntado) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((participacionEvento: IParticipacionEvento) => {
                participacionEvento.fechaApuntado =
                    participacionEvento.fechaApuntado != null ? moment(participacionEvento.fechaApuntado) : null;
            });
        }
        return res;
    }
}
