import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user-ext',
                loadChildren: './user-ext/user-ext.module#BackendLsRidersUserExtModule'
            },
            {
                path: 'moto',
                loadChildren: './moto/moto.module#BackendLsRidersMotoModule'
            },
            {
                path: 'event',
                loadChildren: './event/event.module#BackendLsRidersEventModule'
            },
            {
                path: 'rating-event',
                loadChildren: './rating-event/rating-event.module#BackendLsRidersRatingEventModule'
            },
            {
                path: 'participacion-evento',
                loadChildren: './participacion-evento/participacion-evento.module#BackendLsRidersParticipacionEventoModule'
            },
            {
                path: 'punts-clau',
                loadChildren: './punts-clau/punts-clau.module#BackendLsRidersPuntsClauModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BackendLsRidersEntityModule {}
