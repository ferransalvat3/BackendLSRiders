import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserExt } from 'app/shared/model/user-ext.model';
import { AccountService } from 'app/core';
import { UserExtService } from './user-ext.service';

@Component({
    selector: 'jhi-user-ext',
    templateUrl: './user-ext.component.html'
})
export class UserExtComponent implements OnInit, OnDestroy {
    userExts: IUserExt[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected userExtService: UserExtService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.userExtService
            .query()
            .pipe(
                filter((res: HttpResponse<IUserExt[]>) => res.ok),
                map((res: HttpResponse<IUserExt[]>) => res.body)
            )
            .subscribe(
                (res: IUserExt[]) => {
                    this.userExts = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserExts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserExt) {
        return item.id;
    }

    registerChangeInUserExts() {
        this.eventSubscriber = this.eventManager.subscribe('userExtListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
