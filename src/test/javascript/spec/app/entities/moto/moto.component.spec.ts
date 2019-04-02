/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendLsRidersTestModule } from '../../../test.module';
import { MotoComponent } from 'app/entities/moto/moto.component';
import { MotoService } from 'app/entities/moto/moto.service';
import { Moto } from 'app/shared/model/moto.model';

describe('Component Tests', () => {
    describe('Moto Management Component', () => {
        let comp: MotoComponent;
        let fixture: ComponentFixture<MotoComponent>;
        let service: MotoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [MotoComponent],
                providers: []
            })
                .overrideTemplate(MotoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MotoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Moto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.motos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
