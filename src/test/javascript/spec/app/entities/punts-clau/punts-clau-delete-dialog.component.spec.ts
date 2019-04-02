/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BackendLsRidersTestModule } from '../../../test.module';
import { PuntsClauDeleteDialogComponent } from 'app/entities/punts-clau/punts-clau-delete-dialog.component';
import { PuntsClauService } from 'app/entities/punts-clau/punts-clau.service';

describe('Component Tests', () => {
    describe('PuntsClau Management Delete Component', () => {
        let comp: PuntsClauDeleteDialogComponent;
        let fixture: ComponentFixture<PuntsClauDeleteDialogComponent>;
        let service: PuntsClauService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [PuntsClauDeleteDialogComponent]
            })
                .overrideTemplate(PuntsClauDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PuntsClauDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntsClauService);
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
