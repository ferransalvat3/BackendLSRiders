/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BackendLsRidersTestModule } from '../../../test.module';
import { MotoDeleteDialogComponent } from 'app/entities/moto/moto-delete-dialog.component';
import { MotoService } from 'app/entities/moto/moto.service';

describe('Component Tests', () => {
    describe('Moto Management Delete Component', () => {
        let comp: MotoDeleteDialogComponent;
        let fixture: ComponentFixture<MotoDeleteDialogComponent>;
        let service: MotoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [MotoDeleteDialogComponent]
            })
                .overrideTemplate(MotoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MotoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotoService);
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
