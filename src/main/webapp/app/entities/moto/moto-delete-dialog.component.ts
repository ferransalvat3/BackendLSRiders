import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMoto } from 'app/shared/model/moto.model';
import { MotoService } from './moto.service';

@Component({
    selector: 'jhi-moto-delete-dialog',
    templateUrl: './moto-delete-dialog.component.html'
})
export class MotoDeleteDialogComponent {
    moto: IMoto;

    constructor(protected motoService: MotoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'motoListModification',
                content: 'Deleted an moto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-moto-delete-popup',
    template: ''
})
export class MotoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ moto }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MotoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.moto = moto;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/moto', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/moto', { outlets: { popup: null } }]);
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
