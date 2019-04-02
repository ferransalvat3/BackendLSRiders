import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserExt } from 'app/shared/model/user-ext.model';

type EntityResponseType = HttpResponse<IUserExt>;
type EntityArrayResponseType = HttpResponse<IUserExt[]>;

@Injectable({ providedIn: 'root' })
export class UserExtService {
    public resourceUrl = SERVER_API_URL + 'api/user-exts';

    constructor(protected http: HttpClient) {}

    create(userExt: IUserExt): Observable<EntityResponseType> {
        return this.http.post<IUserExt>(this.resourceUrl, userExt, { observe: 'response' });
    }

    update(userExt: IUserExt): Observable<EntityResponseType> {
        return this.http.put<IUserExt>(this.resourceUrl, userExt, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserExt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserExt[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
