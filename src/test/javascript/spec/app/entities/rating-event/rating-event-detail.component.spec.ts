/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendLsRidersTestModule } from '../../../test.module';
import { RatingEventDetailComponent } from 'app/entities/rating-event/rating-event-detail.component';
import { RatingEvent } from 'app/shared/model/rating-event.model';

describe('Component Tests', () => {
    describe('RatingEvent Management Detail Component', () => {
        let comp: RatingEventDetailComponent;
        let fixture: ComponentFixture<RatingEventDetailComponent>;
        const route = ({ data: of({ ratingEvent: new RatingEvent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [RatingEventDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RatingEventDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RatingEventDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ratingEvent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
