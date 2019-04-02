import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParticipacionEvento } from 'app/shared/model/participacion-evento.model';
import { ParticipacionEventoService } from './participacion-evento.service';

@Component({
    selector: 'jhi-participacion-evento-delete-dialog',
    templateUrl: './participacion-evento-delete-dialog.component.html'
})
export class ParticipacionEventoDeleteDialogComponent {
    participacionEvento: IParticipacionEvento;

    constructor(
        protected participacionEventoService: ParticipacionEventoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.participacionEventoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'participacionEventoListModification',
                content: 'Deleted an participacionEvento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-participacion-evento-delete-popup',
    template: ''
})
export class ParticipacionEventoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ participacionEvento }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParticipacionEventoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.participacionEvento = participacionEvento;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/participacion-evento', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/participacion-evento', { outlets: { popup: null } }]);
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
