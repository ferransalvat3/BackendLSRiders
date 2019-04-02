import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPuntsClau } from 'app/shared/model/punts-clau.model';
import { PuntsClauService } from './punts-clau.service';

@Component({
    selector: 'jhi-punts-clau-delete-dialog',
    templateUrl: './punts-clau-delete-dialog.component.html'
})
export class PuntsClauDeleteDialogComponent {
    puntsClau: IPuntsClau;

    constructor(
        protected puntsClauService: PuntsClauService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.puntsClauService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'puntsClauListModification',
                content: 'Deleted an puntsClau'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-punts-clau-delete-popup',
    template: ''
})
export class PuntsClauDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ puntsClau }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PuntsClauDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.puntsClau = puntsClau;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/punts-clau', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/punts-clau', { outlets: { popup: null } }]);
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
