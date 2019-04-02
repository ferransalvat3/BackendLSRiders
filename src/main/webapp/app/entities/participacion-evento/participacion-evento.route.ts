import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ParticipacionEvento } from 'app/shared/model/participacion-evento.model';
import { ParticipacionEventoService } from './participacion-evento.service';
import { ParticipacionEventoComponent } from './participacion-evento.component';
import { ParticipacionEventoDetailComponent } from './participacion-evento-detail.component';
import { ParticipacionEventoUpdateComponent } from './participacion-evento-update.component';
import { ParticipacionEventoDeletePopupComponent } from './participacion-evento-delete-dialog.component';
import { IParticipacionEvento } from 'app/shared/model/participacion-evento.model';

@Injectable({ providedIn: 'root' })
export class ParticipacionEventoResolve implements Resolve<IParticipacionEvento> {
    constructor(private service: ParticipacionEventoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParticipacionEvento> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ParticipacionEvento>) => response.ok),
                map((participacionEvento: HttpResponse<ParticipacionEvento>) => participacionEvento.body)
            );
        }
        return of(new ParticipacionEvento());
    }
}

export const participacionEventoRoute: Routes = [
    {
        path: '',
        component: ParticipacionEventoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.participacionEvento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ParticipacionEventoDetailComponent,
        resolve: {
            participacionEvento: ParticipacionEventoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.participacionEvento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ParticipacionEventoUpdateComponent,
        resolve: {
            participacionEvento: ParticipacionEventoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.participacionEvento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ParticipacionEventoUpdateComponent,
        resolve: {
            participacionEvento: ParticipacionEventoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.participacionEvento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const participacionEventoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ParticipacionEventoDeletePopupComponent,
        resolve: {
            participacionEvento: ParticipacionEventoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.participacionEvento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
