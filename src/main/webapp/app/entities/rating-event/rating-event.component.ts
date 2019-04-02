import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRatingEvent } from 'app/shared/model/rating-event.model';
import { AccountService } from 'app/core';
import { RatingEventService } from './rating-event.service';

@Component({
    selector: 'jhi-rating-event',
    templateUrl: './rating-event.component.html'
})
export class RatingEventComponent implements OnInit, OnDestroy {
    ratingEvents: IRatingEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ratingEventService: RatingEventService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ratingEventService
            .query()
            .pipe(
                filter((res: HttpResponse<IRatingEvent[]>) => res.ok),
                map((res: HttpResponse<IRatingEvent[]>) => res.body)
            )
            .subscribe(
                (res: IRatingEvent[]) => {
                    this.ratingEvents = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRatingEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRatingEvent) {
        return item.id;
    }

    registerChangeInRatingEvents() {
        this.eventSubscriber = this.eventManager.subscribe('ratingEventListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
