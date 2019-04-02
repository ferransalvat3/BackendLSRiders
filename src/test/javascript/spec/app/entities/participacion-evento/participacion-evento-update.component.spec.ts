/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BackendLsRidersTestModule } from '../../../test.module';
import { ParticipacionEventoUpdateComponent } from 'app/entities/participacion-evento/participacion-evento-update.component';
import { ParticipacionEventoService } from 'app/entities/participacion-evento/participacion-evento.service';
import { ParticipacionEvento } from 'app/shared/model/participacion-evento.model';

describe('Component Tests', () => {
    describe('ParticipacionEvento Management Update Component', () => {
        let comp: ParticipacionEventoUpdateComponent;
        let fixture: ComponentFixture<ParticipacionEventoUpdateComponent>;
        let service: ParticipacionEventoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [ParticipacionEventoUpdateComponent]
            })
                .overrideTemplate(ParticipacionEventoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParticipacionEventoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParticipacionEventoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ParticipacionEvento(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.participacionEvento = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ParticipacionEvento();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.participacionEvento = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
