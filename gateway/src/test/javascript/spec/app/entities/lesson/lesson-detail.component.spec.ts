/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ArmoryTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LessonDetailComponent } from '../../../../../../main/webapp/app/entities/lesson/lesson-detail.component';
import { LessonService } from '../../../../../../main/webapp/app/entities/lesson/lesson.service';
import { Lesson } from '../../../../../../main/webapp/app/entities/lesson/lesson.model';

describe('Component Tests', () => {

    describe('Lesson Management Detail Component', () => {
        let comp: LessonDetailComponent;
        let fixture: ComponentFixture<LessonDetailComponent>;
        let service: LessonService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [LessonDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LessonService,
                    JhiEventManager
                ]
            }).overrideTemplate(LessonDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Lesson(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.lesson).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
