import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPuntsClau } from 'app/shared/model/punts-clau.model';
import { AccountService } from 'app/core';
import { PuntsClauService } from './punts-clau.service';

@Component({
    selector: 'jhi-punts-clau',
    templateUrl: './punts-clau.component.html'
})
export class PuntsClauComponent implements OnInit, OnDestroy {
    puntsClaus: IPuntsClau[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected puntsClauService: PuntsClauService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.puntsClauService
            .query()
            .pipe(
                filter((res: HttpResponse<IPuntsClau[]>) => res.ok),
                map((res: HttpResponse<IPuntsClau[]>) => res.body)
            )
            .subscribe(
                (res: IPuntsClau[]) => {
                    this.puntsClaus = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPuntsClaus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPuntsClau) {
        return item.id;
    }

    registerChangeInPuntsClaus() {
        this.eventSubscriber = this.eventManager.subscribe('puntsClauListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
