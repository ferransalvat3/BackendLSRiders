import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRatingEvent } from 'app/shared/model/rating-event.model';

type EntityResponseType = HttpResponse<IRatingEvent>;
type EntityArrayResponseType = HttpResponse<IRatingEvent[]>;

@Injectable({ providedIn: 'root' })
export class RatingEventService {
    public resourceUrl = SERVER_API_URL + 'api/rating-events';

    constructor(protected http: HttpClient) {}

    create(ratingEvent: IRatingEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ratingEvent);
        return this.http
            .post<IRatingEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(ratingEvent: IRatingEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ratingEvent);
        return this.http
            .put<IRatingEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRatingEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRatingEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(ratingEvent: IRatingEvent): IRatingEvent {
        const copy: IRatingEvent = Object.assign({}, ratingEvent, {
            date: ratingEvent.date != null && ratingEvent.date.isValid() ? ratingEvent.date.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((ratingEvent: IRatingEvent) => {
                ratingEvent.date = ratingEvent.date != null ? moment(ratingEvent.date) : null;
            });
        }
        return res;
    }
}
