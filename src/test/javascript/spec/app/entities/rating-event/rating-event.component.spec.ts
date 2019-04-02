/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendLsRidersTestModule } from '../../../test.module';
import { RatingEventComponent } from 'app/entities/rating-event/rating-event.component';
import { RatingEventService } from 'app/entities/rating-event/rating-event.service';
import { RatingEvent } from 'app/shared/model/rating-event.model';

describe('Component Tests', () => {
    describe('RatingEvent Management Component', () => {
        let comp: RatingEventComponent;
        let fixture: ComponentFixture<RatingEventComponent>;
        let service: RatingEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [RatingEventComponent],
                providers: []
            })
                .overrideTemplate(RatingEventComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RatingEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingEventService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RatingEvent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ratingEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
