/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendLsRidersTestModule } from '../../../test.module';
import { MotoDetailComponent } from 'app/entities/moto/moto-detail.component';
import { Moto } from 'app/shared/model/moto.model';

describe('Component Tests', () => {
    describe('Moto Management Detail Component', () => {
        let comp: MotoDetailComponent;
        let fixture: ComponentFixture<MotoDetailComponent>;
        const route = ({ data: of({ moto: new Moto(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [MotoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MotoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MotoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.moto).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
