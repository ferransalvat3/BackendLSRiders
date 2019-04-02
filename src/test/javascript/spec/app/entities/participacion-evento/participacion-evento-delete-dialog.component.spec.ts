/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BackendLsRidersTestModule } from '../../../test.module';
import { ParticipacionEventoDeleteDialogComponent } from 'app/entities/participacion-evento/participacion-evento-delete-dialog.component';
import { ParticipacionEventoService } from 'app/entities/participacion-evento/participacion-evento.service';

describe('Component Tests', () => {
    describe('ParticipacionEvento Management Delete Component', () => {
        let comp: ParticipacionEventoDeleteDialogComponent;
        let fixture: ComponentFixture<ParticipacionEventoDeleteDialogComponent>;
        let service: ParticipacionEventoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [ParticipacionEventoDeleteDialogComponent]
            })
                .overrideTemplate(ParticipacionEventoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParticipacionEventoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParticipacionEventoService);
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
