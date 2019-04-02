/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BackendLsRidersTestModule } from '../../../test.module';
import { UserExtComponent } from 'app/entities/user-ext/user-ext.component';
import { UserExtService } from 'app/entities/user-ext/user-ext.service';
import { UserExt } from 'app/shared/model/user-ext.model';

describe('Component Tests', () => {
    describe('UserExt Management Component', () => {
        let comp: UserExtComponent;
        let fixture: ComponentFixture<UserExtComponent>;
        let service: UserExtService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [UserExtComponent],
                providers: []
            })
                .overrideTemplate(UserExtComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserExtComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserExt(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userExts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
