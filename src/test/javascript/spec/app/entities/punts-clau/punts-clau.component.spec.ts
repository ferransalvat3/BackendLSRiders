/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendLsRidersTestModule } from '../../../test.module';
import { PuntsClauComponent } from 'app/entities/punts-clau/punts-clau.component';
import { PuntsClauService } from 'app/entities/punts-clau/punts-clau.service';
import { PuntsClau } from 'app/shared/model/punts-clau.model';

describe('Component Tests', () => {
    describe('PuntsClau Management Component', () => {
        let comp: PuntsClauComponent;
        let fixture: ComponentFixture<PuntsClauComponent>;
        let service: PuntsClauService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [PuntsClauComponent],
                providers: []
            })
                .overrideTemplate(PuntsClauComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PuntsClauComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntsClauService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PuntsClau(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.puntsClaus[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
