/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendLsRidersTestModule } from '../../../test.module';
import { ParticipacionEventoDetailComponent } from 'app/entities/participacion-evento/participacion-evento-detail.component';
import { ParticipacionEvento } from 'app/shared/model/participacion-evento.model';

describe('Component Tests', () => {
    describe('ParticipacionEvento Management Detail Component', () => {
        let comp: ParticipacionEventoDetailComponent;
        let fixture: ComponentFixture<ParticipacionEventoDetailComponent>;
        const route = ({ data: of({ participacionEvento: new ParticipacionEvento(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [ParticipacionEventoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParticipacionEventoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParticipacionEventoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.participacionEvento).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
