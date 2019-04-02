/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BackendLsRidersTestModule } from '../../../test.module';
import { UserExtDeleteDialogComponent } from 'app/entities/user-ext/user-ext-delete-dialog.component';
import { UserExtService } from 'app/entities/user-ext/user-ext.service';

describe('Component Tests', () => {
    describe('UserExt Management Delete Component', () => {
        let comp: UserExtDeleteDialogComponent;
        let fixture: ComponentFixture<UserExtDeleteDialogComponent>;
        let service: UserExtService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [UserExtDeleteDialogComponent]
            })
                .overrideTemplate(UserExtDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserExtDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
