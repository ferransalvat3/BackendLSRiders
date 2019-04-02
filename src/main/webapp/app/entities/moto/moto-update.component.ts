import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IMoto } from 'app/shared/model/moto.model';
import { MotoService } from './moto.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-moto-update',
    templateUrl: './moto-update.component.html'
})
export class MotoUpdateComponent implements OnInit {
    moto: IMoto;
    isSaving: boolean;

    users: IUser[];
    year: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected motoService: MotoService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ moto }) => {
            this.moto = moto;
            this.year = this.moto.year != null ? this.moto.year.format(DATE_TIME_FORMAT) : null;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.moto.year = this.year != null ? moment(this.year, DATE_TIME_FORMAT) : null;
        if (this.moto.id !== undefined) {
            this.subscribeToSaveResponse(this.motoService.update(this.moto));
        } else {
            this.subscribeToSaveResponse(this.motoService.create(this.moto));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMoto>>) {
        result.subscribe((res: HttpResponse<IMoto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
