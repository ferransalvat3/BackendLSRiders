/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BackendLsRidersTestModule } from '../../../test.module';
import { UserExtDetailComponent } from 'app/entities/user-ext/user-ext-detail.component';
import { UserExt } from 'app/shared/model/user-ext.model';

describe('Component Tests', () => {
    describe('UserExt Management Detail Component', () => {
        let comp: UserExtDetailComponent;
        let fixture: ComponentFixture<UserExtDetailComponent>;
        const route = ({ data: of({ userExt: new UserExt(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [UserExtDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserExtDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserExtDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userExt).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
