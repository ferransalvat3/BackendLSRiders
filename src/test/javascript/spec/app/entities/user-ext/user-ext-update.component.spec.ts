/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BackendLsRidersTestModule } from '../../../test.module';
import { UserExtUpdateComponent } from 'app/entities/user-ext/user-ext-update.component';
import { UserExtService } from 'app/entities/user-ext/user-ext.service';
import { UserExt } from 'app/shared/model/user-ext.model';

describe('Component Tests', () => {
    describe('UserExt Management Update Component', () => {
        let comp: UserExtUpdateComponent;
        let fixture: ComponentFixture<UserExtUpdateComponent>;
        let service: UserExtService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BackendLsRidersTestModule],
                declarations: [UserExtUpdateComponent]
            })
                .overrideTemplate(UserExtUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserExtUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserExt(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userExt = entity;
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
                    const entity = new UserExt();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userExt = entity;
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
