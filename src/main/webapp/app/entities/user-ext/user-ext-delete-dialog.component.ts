import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserExt } from 'app/shared/model/user-ext.model';
import { UserExtService } from './user-ext.service';

@Component({
    selector: 'jhi-user-ext-delete-dialog',
    templateUrl: './user-ext-delete-dialog.component.html'
})
export class UserExtDeleteDialogComponent {
    userExt: IUserExt;

    constructor(protected userExtService: UserExtService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userExtService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userExtListModification',
                content: 'Deleted an userExt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-ext-delete-popup',
    template: ''
})
export class UserExtDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userExt }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserExtDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.userExt = userExt;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/user-ext', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/user-ext', { outlets: { popup: null } }]);
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
