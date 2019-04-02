import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMoto } from 'app/shared/model/moto.model';
import { AccountService } from 'app/core';
import { MotoService } from './moto.service';

@Component({
    selector: 'jhi-moto',
    templateUrl: './moto.component.html'
})
export class MotoComponent implements OnInit, OnDestroy {
    motos: IMoto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected motoService: MotoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.motoService
            .query()
            .pipe(
                filter((res: HttpResponse<IMoto[]>) => res.ok),
                map((res: HttpResponse<IMoto[]>) => res.body)
            )
            .subscribe(
                (res: IMoto[]) => {
                    this.motos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMotos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMoto) {
        return item.id;
    }

    registerChangeInMotos() {
        this.eventSubscriber = this.eventManager.subscribe('motoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
