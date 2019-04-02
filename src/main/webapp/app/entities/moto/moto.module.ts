import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BackendLsRidersSharedModule } from 'app/shared';
import {
    MotoComponent,
    MotoDetailComponent,
    MotoUpdateComponent,
    MotoDeletePopupComponent,
    MotoDeleteDialogComponent,
    motoRoute,
    motoPopupRoute
} from './';

const ENTITY_STATES = [...motoRoute, ...motoPopupRoute];

@NgModule({
    imports: [BackendLsRidersSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MotoComponent, MotoDetailComponent, MotoUpdateComponent, MotoDeleteDialogComponent, MotoDeletePopupComponent],
    entryComponents: [MotoComponent, MotoUpdateComponent, MotoDeleteDialogComponent, MotoDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BackendLsRidersMotoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
