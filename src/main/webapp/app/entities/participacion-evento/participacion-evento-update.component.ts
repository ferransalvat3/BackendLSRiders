import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IParticipacionEvento } from 'app/shared/model/participacion-evento.model';
import { ParticipacionEventoService } from './participacion-evento.service';
import { IUser, UserService } from 'app/core';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from 'app/entities/event';

@Component({
    selector: 'jhi-participacion-evento-update',
    templateUrl: './participacion-evento-update.component.html'
})
export class ParticipacionEventoUpdateComponent implements OnInit {
    participacionEvento: IParticipacionEvento;
    isSaving: boolean;

    users: IUser[];

    events: IEvent[];
    fechaApuntado: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected participacionEventoService: ParticipacionEventoService,
        protected userService: UserService,
        protected eventService: EventService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ participacionEvento }) => {
            this.participacionEvento = participacionEvento;
            this.fechaApuntado =
                this.participacionEvento.fechaApuntado != null ? this.participacionEvento.fechaApuntado.format(DATE_TIME_FORMAT) : null;
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
        this.participacionEvento.fechaApuntado = this.fechaApuntado != null ? moment(this.fechaApuntado, DATE_TIME_FORMAT) : null;
        if (this.participacionEvento.id !== undefined) {
            this.subscribeToSaveResponse(this.participacionEventoService.update(this.participacionEvento));
        } else {
            this.subscribeToSaveResponse(this.participacionEventoService.create(this.participacionEvento));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParticipacionEvento>>) {
        result.subscribe((res: HttpResponse<IParticipacionEvento>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
