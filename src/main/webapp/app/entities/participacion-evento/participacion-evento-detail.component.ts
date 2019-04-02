import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParticipacionEvento } from 'app/shared/model/participacion-evento.model';

@Component({
    selector: 'jhi-participacion-evento-detail',
    templateUrl: './participacion-evento-detail.component.html'
})
export class ParticipacionEventoDetailComponent implements OnInit {
    participacionEvento: IParticipacionEvento;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ participacionEvento }) => {
            this.participacionEvento = participacionEvento;
        });
    }

    previousState() {
        window.history.back();
    }
}
