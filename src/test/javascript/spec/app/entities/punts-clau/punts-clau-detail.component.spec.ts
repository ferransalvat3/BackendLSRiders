/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendLsRidersTestModule } from '../../../test.module';
import { PuntsClauDetailComponent } from 'app/entities/punts-clau/punts-clau-detail.component';
import { PuntsClau } from 'app/shared/model/punts-clau.model';

describe('Component Tests', () => {
    describe('PuntsClau Management Detail Component', () => {
        let comp: PuntsClauDetailComponent;
        let fixture: ComponentFixture<PuntsClauDetailComponent>;
        const route = ({ data: of({ puntsClau: new PuntsClau(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [PuntsClauDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PuntsClauDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PuntsClauDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.puntsClau).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
