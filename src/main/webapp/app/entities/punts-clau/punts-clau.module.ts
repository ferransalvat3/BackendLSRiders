import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BackendLsRidersSharedModule } from 'app/shared';
import {
    PuntsClauComponent,
    PuntsClauDetailComponent,
    PuntsClauUpdateComponent,
    PuntsClauDeletePopupComponent,
    PuntsClauDeleteDialogComponent,
    puntsClauRoute,
    puntsClauPopupRoute
} from './';

const ENTITY_STATES = [...puntsClauRoute, ...puntsClauPopupRoute];

@NgModule({
    imports: [BackendLsRidersSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PuntsClauComponent,
        PuntsClauDetailComponent,
        PuntsClauUpdateComponent,
        PuntsClauDeleteDialogComponent,
        PuntsClauDeletePopupComponent
    ],
    entryComponents: [PuntsClauComponent, PuntsClauUpdateComponent, PuntsClauDeleteDialogComponent, PuntsClauDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BackendLsRidersPuntsClauModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
