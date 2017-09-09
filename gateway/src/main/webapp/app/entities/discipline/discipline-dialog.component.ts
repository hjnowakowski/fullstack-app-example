import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Discipline } from './discipline.model';
import { DisciplinePopupService } from './discipline-popup.service';
import { DisciplineService } from './discipline.service';
import { Program, ProgramService } from '../program';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-discipline-dialog',
    templateUrl: './discipline-dialog.component.html'
})
export class DisciplineDialogComponent implements OnInit {

    discipline: Discipline;
    isSaving: boolean;

    programs: Program[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private disciplineService: DisciplineService,
        private programService: ProgramService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.programService.query()
            .subscribe((res: ResponseWrapper) => { this.programs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.discipline.id !== undefined) {
            this.subscribeToSaveResponse(
                this.disciplineService.update(this.discipline));
        } else {
            this.subscribeToSaveResponse(
                this.disciplineService.create(this.discipline));
        }
    }

    private subscribeToSaveResponse(result: Observable<Discipline>) {
        result.subscribe((res: Discipline) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Discipline) {
        this.eventManager.broadcast({ name: 'disciplineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackProgramById(index: number, item: Program) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-discipline-popup',
    template: ''
})
export class DisciplinePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private disciplinePopupService: DisciplinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.disciplinePopupService
                    .open(DisciplineDialogComponent as Component, params['id']);
            } else {
                this.disciplinePopupService
                    .open(DisciplineDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
