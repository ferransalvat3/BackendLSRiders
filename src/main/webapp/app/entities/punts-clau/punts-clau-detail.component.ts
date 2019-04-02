import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPuntsClau } from 'app/shared/model/punts-clau.model';

@Component({
    selector: 'jhi-punts-clau-detail',
    templateUrl: './punts-clau-detail.component.html'
})
export class PuntsClauDetailComponent implements OnInit {
    puntsClau: IPuntsClau;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ puntsClau }) => {
            this.puntsClau = puntsClau;
        });
    }

    previousState() {
        window.history.back();
    }
}
