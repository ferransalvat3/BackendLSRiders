import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BackendLsRidersSharedModule } from 'app/shared';
import {
    RatingEventComponent,
    RatingEventDetailComponent,
    RatingEventUpdateComponent,
    RatingEventDeletePopupComponent,
    RatingEventDeleteDialogComponent,
    ratingEventRoute,
    ratingEventPopupRoute
} from './';

const ENTITY_STATES = [...ratingEventRoute, ...ratingEventPopupRoute];

@NgModule({
    imports: [BackendLsRidersSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RatingEventComponent,
        RatingEventDetailComponent,
        RatingEventUpdateComponent,
        RatingEventDeleteDialogComponent,
        RatingEventDeletePopupComponent
    ],
    entryComponents: [RatingEventComponent, RatingEventUpdateComponent, RatingEventDeleteDialogComponent, RatingEventDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BackendLsRidersRatingEventModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
