import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IRatingEvent } from 'app/shared/model/rating-event.model';
import { RatingEventService } from './rating-event.service';
import { IUser, UserService } from 'app/core';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from 'app/entities/event';

@Component({
    selector: 'jhi-rating-event-update',
    templateUrl: './rating-event-update.component.html'
})
export class RatingEventUpdateComponent implements OnInit {
    ratingEvent: IRatingEvent;
    isSaving: boolean;

    users: IUser[];

    events: IEvent[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ratingEventService: RatingEventService,
        protected userService: UserService,
        protected eventService: EventService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ratingEvent }) => {
            this.ratingEvent = ratingEvent;
            this.date = this.ratingEvent.date != null ? this.ratingEvent.date.format(DATE_TIME_FORMAT) : null;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.eventService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEvent[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEvent[]>) => response.body)
            )
            .subscribe((res: IEvent[]) => (this.events = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.ratingEvent.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.ratingEvent.id !== undefined) {
            this.subscribeToSaveResponse(this.ratingEventService.update(this.ratingEvent));
        } else {
            this.subscribeToSaveResponse(this.ratingEventService.create(this.ratingEvent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRatingEvent>>) {
        result.subscribe((res: HttpResponse<IRatingEvent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackEventById(index: number, item: IEvent) {
        return item.id;
    }
}
