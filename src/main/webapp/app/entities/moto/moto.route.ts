import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Moto } from 'app/shared/model/moto.model';
import { MotoService } from './moto.service';
import { MotoComponent } from './moto.component';
import { MotoDetailComponent } from './moto-detail.component';
import { MotoUpdateComponent } from './moto-update.component';
import { MotoDeletePopupComponent } from './moto-delete-dialog.component';
import { IMoto } from 'app/shared/model/moto.model';

@Injectable({ providedIn: 'root' })
export class MotoResolve implements Resolve<IMoto> {
    constructor(private service: MotoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMoto> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Moto>) => response.ok),
                map((moto: HttpResponse<Moto>) => moto.body)
            );
        }
        return of(new Moto());
    }
}

export const motoRoute: Routes = [
    {
        path: '',
        component: MotoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.moto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MotoDetailComponent,
        resolve: {
            moto: MotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.moto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MotoUpdateComponent,
        resolve: {
            moto: MotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.moto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MotoUpdateComponent,
        resolve: {
            moto: MotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.moto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MotoDeletePopupComponent,
        resolve: {
            moto: MotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.moto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
