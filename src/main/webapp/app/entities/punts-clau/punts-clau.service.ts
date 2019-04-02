import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPuntsClau } from 'app/shared/model/punts-clau.model';

type EntityResponseType = HttpResponse<IPuntsClau>;
type EntityArrayResponseType = HttpResponse<IPuntsClau[]>;

@Injectable({ providedIn: 'root' })
export class PuntsClauService {
    public resourceUrl = SERVER_API_URL + 'api/punts-claus';

    constructor(protected http: HttpClient) {}

    create(puntsClau: IPuntsClau): Observable<EntityResponseType> {
        return this.http.post<IPuntsClau>(this.resourceUrl, puntsClau, { observe: 'response' });
    }

    update(puntsClau: IPuntsClau): Observable<EntityResponseType> {
        return this.http.put<IPuntsClau>(this.resourceUrl, puntsClau, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPuntsClau>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPuntsClau[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
