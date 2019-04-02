import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPuntsClau } from 'app/shared/model/punts-clau.model';
import { PuntsClauService } from './punts-clau.service';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from 'app/entities/event';

@Component({
    selector: 'jhi-punts-clau-update',
    templateUrl: './punts-clau-update.component.html'
})
export class PuntsClauUpdateComponent implements OnInit {
    puntsClau: IPuntsClau;
    isSaving: boolean;

    events: IEvent[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected puntsClauService: PuntsClauService,
        protected eventService: EventService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ puntsClau }) => {
            this.puntsClau = puntsClau;
        });
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
        if (this.puntsClau.id !== undefined) {
            this.subscribeToSaveResponse(this.puntsClauService.update(this.puntsClau));
        } else {
            this.subscribeToSaveResponse(this.puntsClauService.create(this.puntsClau));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPuntsClau>>) {
        result.subscribe((res: HttpResponse<IPuntsClau>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEventById(index: number, item: IEvent) {
        return item.id;
    }
}
