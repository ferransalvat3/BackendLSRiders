/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BackendLsRidersTestModule } from '../../../test.module';
import { RatingEventDeleteDialogComponent } from 'app/entities/rating-event/rating-event-delete-dialog.component';
import { RatingEventService } from 'app/entities/rating-event/rating-event.service';

describe('Component Tests', () => {
    describe('RatingEvent Management Delete Component', () => {
        let comp: RatingEventDeleteDialogComponent;
        let fixture: ComponentFixture<RatingEventDeleteDialogComponent>;
        let service: RatingEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [RatingEventDeleteDialogComponent]
            })
                .overrideTemplate(RatingEventDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RatingEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingEventService);
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
