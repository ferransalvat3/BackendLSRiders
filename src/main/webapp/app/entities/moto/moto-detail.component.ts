import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMoto } from 'app/shared/model/moto.model';

@Component({
    selector: 'jhi-moto-detail',
    templateUrl: './moto-detail.component.html'
})
export class MotoDetailComponent implements OnInit {
    moto: IMoto;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ moto }) => {
            this.moto = moto;
        });
    }

    previousState() {
        window.history.back();
    }
}
