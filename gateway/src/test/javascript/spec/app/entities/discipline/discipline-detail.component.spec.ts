/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ArmoryTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DisciplineDetailComponent } from '../../../../../../main/webapp/app/entities/discipline/discipline-detail.component';
import { DisciplineService } from '../../../../../../main/webapp/app/entities/discipline/discipline.service';
import { Discipline } from '../../../../../../main/webapp/app/entities/discipline/discipline.model';

describe('Component Tests', () => {

    describe('Discipline Management Detail Component', () => {
        let comp: DisciplineDetailComponent;
        let fixture: ComponentFixture<DisciplineDetailComponent>;
        let service: DisciplineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [DisciplineDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DisciplineService,
                    JhiEventManager
                ]
            }).overrideTemplate(DisciplineDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisciplineDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisciplineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Discipline(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.discipline).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
