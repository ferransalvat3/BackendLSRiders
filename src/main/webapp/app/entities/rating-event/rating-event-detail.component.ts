import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRatingEvent } from 'app/shared/model/rating-event.model';

@Component({
    selector: 'jhi-rating-event-detail',
    templateUrl: './rating-event-detail.component.html'
})
export class RatingEventDetailComponent implements OnInit {
    ratingEvent: IRatingEvent;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ratingEvent }) => {
            this.ratingEvent = ratingEvent;
        });
    }

    previousState() {
        window.history.back();
    }
}
