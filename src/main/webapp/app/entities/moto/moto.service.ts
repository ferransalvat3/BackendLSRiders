import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMoto } from 'app/shared/model/moto.model';

type EntityResponseType = HttpResponse<IMoto>;
type EntityArrayResponseType = HttpResponse<IMoto[]>;

@Injectable({ providedIn: 'root' })
export class MotoService {
    public resourceUrl = SERVER_API_URL + 'api/motos';

    constructor(protected http: HttpClient) {}

    create(moto: IMoto): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(moto);
        return this.http
            .post<IMoto>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(moto: IMoto): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(moto);
        return this.http
            .put<IMoto>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMoto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMoto[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(moto: IMoto): IMoto {
        const copy: IMoto = Object.assign({}, moto, {
            year: moto.year != null && moto.year.isValid() ? moto.year.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.year = res.body.year != null ? moment(res.body.year) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((moto: IMoto) => {
                moto.year = moto.year != null ? moment(moto.year) : null;
            });
        }
        return res;
    }
}
