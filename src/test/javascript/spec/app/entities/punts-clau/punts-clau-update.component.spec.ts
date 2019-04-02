/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BackendLsRidersTestModule } from '../../../test.module';
import { PuntsClauUpdateComponent } from 'app/entities/punts-clau/punts-clau-update.component';
import { PuntsClauService } from 'app/entities/punts-clau/punts-clau.service';
import { PuntsClau } from 'app/shared/model/punts-clau.model';

describe('Component Tests', () => {
    describe('PuntsClau Management Update Component', () => {
        let comp: PuntsClauUpdateComponent;
        let fixture: ComponentFixture<PuntsClauUpdateComponent>;
        let service: PuntsClauService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [PuntsClauUpdateComponent]
            })
                .overrideTemplate(PuntsClauUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PuntsClauUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PuntsClauService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PuntsClau(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.puntsClau = entity;
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
                    const entity = new PuntsClau();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.puntsClau = entity;
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
