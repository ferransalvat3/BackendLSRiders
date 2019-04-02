import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParticipacionEvento } from 'app/shared/model/participacion-evento.model';
import { AccountService } from 'app/core';
import { ParticipacionEventoService } from './participacion-evento.service';

@Component({
    selector: 'jhi-participacion-evento',
    templateUrl: './participacion-evento.component.html'
})
export class ParticipacionEventoComponent implements OnInit, OnDestroy {
    participacionEventos: IParticipacionEvento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected participacionEventoService: ParticipacionEventoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.participacionEventoService
            .query()
            .pipe(
                filter((res: HttpResponse<IParticipacionEvento[]>) => res.ok),
                map((res: HttpResponse<IParticipacionEvento[]>) => res.body)
            )
            .subscribe(
                (res: IParticipacionEvento[]) => {
                    this.participacionEventos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParticipacionEventos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParticipacionEvento) {
        return item.id;
    }

    registerChangeInParticipacionEventos() {
        this.eventSubscriber = this.eventManager.subscribe('participacionEventoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
