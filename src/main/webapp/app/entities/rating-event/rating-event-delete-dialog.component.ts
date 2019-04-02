import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRatingEvent } from 'app/shared/model/rating-event.model';
import { RatingEventService } from './rating-event.service';

@Component({
    selector: 'jhi-rating-event-delete-dialog',
    templateUrl: './rating-event-delete-dialog.component.html'
})
export class RatingEventDeleteDialogComponent {
    ratingEvent: IRatingEvent;

    constructor(
        protected ratingEventService: RatingEventService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ratingEventService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ratingEventListModification',
                content: 'Deleted an ratingEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rating-event-delete-popup',
    template: ''
})
export class RatingEventDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ratingEvent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RatingEventDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ratingEvent = ratingEvent;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/rating-event', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/rating-event', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
