import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BackendLsRidersSharedModule } from 'app/shared';
import {
    UserExtComponent,
    UserExtDetailComponent,
    UserExtUpdateComponent,
    UserExtDeletePopupComponent,
    UserExtDeleteDialogComponent,
    userExtRoute,
    userExtPopupRoute
} from './';

const ENTITY_STATES = [...userExtRoute, ...userExtPopupRoute];

@NgModule({
    imports: [BackendLsRidersSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserExtComponent,
        UserExtDetailComponent,
        UserExtUpdateComponent,
        UserExtDeleteDialogComponent,
        UserExtDeletePopupComponent
    ],
    entryComponents: [UserExtComponent, UserExtUpdateComponent, UserExtDeleteDialogComponent, UserExtDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BackendLsRidersUserExtModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
