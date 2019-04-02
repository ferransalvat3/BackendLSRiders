import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PuntsClau } from 'app/shared/model/punts-clau.model';
import { PuntsClauService } from './punts-clau.service';
import { PuntsClauComponent } from './punts-clau.component';
import { PuntsClauDetailComponent } from './punts-clau-detail.component';
import { PuntsClauUpdateComponent } from './punts-clau-update.component';
import { PuntsClauDeletePopupComponent } from './punts-clau-delete-dialog.component';
import { IPuntsClau } from 'app/shared/model/punts-clau.model';

@Injectable({ providedIn: 'root' })
export class PuntsClauResolve implements Resolve<IPuntsClau> {
    constructor(private service: PuntsClauService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPuntsClau> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PuntsClau>) => response.ok),
                map((puntsClau: HttpResponse<PuntsClau>) => puntsClau.body)
            );
        }
        return of(new PuntsClau());
    }
}

export const puntsClauRoute: Routes = [
    {
        path: '',
        component: PuntsClauComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.puntsClau.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PuntsClauDetailComponent,
        resolve: {
            puntsClau: PuntsClauResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.puntsClau.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PuntsClauUpdateComponent,
        resolve: {
            puntsClau: PuntsClauResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.puntsClau.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PuntsClauUpdateComponent,
        resolve: {
            puntsClau: PuntsClauResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.puntsClau.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const puntsClauPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PuntsClauDeletePopupComponent,
        resolve: {
            puntsClau: PuntsClauResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.puntsClau.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
