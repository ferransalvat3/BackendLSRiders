import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RatingEvent } from 'app/shared/model/rating-event.model';
import { RatingEventService } from './rating-event.service';
import { RatingEventComponent } from './rating-event.component';
import { RatingEventDetailComponent } from './rating-event-detail.component';
import { RatingEventUpdateComponent } from './rating-event-update.component';
import { RatingEventDeletePopupComponent } from './rating-event-delete-dialog.component';
import { IRatingEvent } from 'app/shared/model/rating-event.model';

@Injectable({ providedIn: 'root' })
export class RatingEventResolve implements Resolve<IRatingEvent> {
    constructor(private service: RatingEventService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRatingEvent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RatingEvent>) => response.ok),
                map((ratingEvent: HttpResponse<RatingEvent>) => ratingEvent.body)
            );
        }
        return of(new RatingEvent());
    }
}

export const ratingEventRoute: Routes = [
    {
        path: '',
        component: RatingEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.ratingEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RatingEventDetailComponent,
        resolve: {
            ratingEvent: RatingEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.ratingEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RatingEventUpdateComponent,
        resolve: {
            ratingEvent: RatingEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.ratingEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RatingEventUpdateComponent,
        resolve: {
            ratingEvent: RatingEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.ratingEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ratingEventPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RatingEventDeletePopupComponent,
        resolve: {
            ratingEvent: RatingEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'backendLsRidersApp.ratingEvent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
