/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BackendLsRidersTestModule } from '../../../test.module';
import { RatingEventUpdateComponent } from 'app/entities/rating-event/rating-event-update.component';
import { RatingEventService } from 'app/entities/rating-event/rating-event.service';
import { RatingEvent } from 'app/shared/model/rating-event.model';

describe('Component Tests', () => {
    describe('RatingEvent Management Update Component', () => {
        let comp: RatingEventUpdateComponent;
        let fixture: ComponentFixture<RatingEventUpdateComponent>;
        let service: RatingEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [RatingEventUpdateComponent]
            })
                .overrideTemplate(RatingEventUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RatingEventUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingEventService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RatingEvent(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ratingEvent = entity;
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
                    const entity = new RatingEvent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ratingEvent = entity;
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
