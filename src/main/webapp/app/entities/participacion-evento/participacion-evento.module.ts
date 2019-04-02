import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BackendLsRidersSharedModule } from 'app/shared';
import {
    ParticipacionEventoComponent,
    ParticipacionEventoDetailComponent,
    ParticipacionEventoUpdateComponent,
    ParticipacionEventoDeletePopupComponent,
    ParticipacionEventoDeleteDialogComponent,
    participacionEventoRoute,
    participacionEventoPopupRoute
} from './';

const ENTITY_STATES = [...participacionEventoRoute, ...participacionEventoPopupRoute];

@NgModule({
    imports: [BackendLsRidersSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ParticipacionEventoComponent,
        ParticipacionEventoDetailComponent,
        ParticipacionEventoUpdateComponent,
        ParticipacionEventoDeleteDialogComponent,
        ParticipacionEventoDeletePopupComponent
    ],
    entryComponents: [
        ParticipacionEventoComponent,
        ParticipacionEventoUpdateComponent,
        ParticipacionEventoDeleteDialogComponent,
        ParticipacionEventoDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BackendLsRidersParticipacionEventoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
