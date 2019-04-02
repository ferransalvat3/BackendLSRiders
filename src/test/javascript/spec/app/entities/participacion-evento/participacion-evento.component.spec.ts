/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendLsRidersTestModule } from '../../../test.module';
import { ParticipacionEventoComponent } from 'app/entities/participacion-evento/participacion-evento.component';
import { ParticipacionEventoService } from 'app/entities/participacion-evento/participacion-evento.service';
import { ParticipacionEvento } from 'app/shared/model/participacion-evento.model';

describe('Component Tests', () => {
    describe('ParticipacionEvento Management Component', () => {
        let comp: ParticipacionEventoComponent;
        let fixture: ComponentFixture<ParticipacionEventoComponent>;
        let service: ParticipacionEventoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [ParticipacionEventoComponent],
                providers: []
            })
                .overrideTemplate(ParticipacionEventoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParticipacionEventoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParticipacionEventoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ParticipacionEvento(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.participacionEventos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
