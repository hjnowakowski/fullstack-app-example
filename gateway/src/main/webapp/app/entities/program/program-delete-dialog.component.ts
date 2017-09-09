import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Program } from './program.model';
import { ProgramPopupService } from './program-popup.service';
import { ProgramService } from './program.service';

@Component({
    selector: 'jhi-program-delete-dialog',
    templateUrl: './program-delete-dialog.component.html'
})
export class ProgramDeleteDialogComponent {

    program: Program;

    constructor(
        private programService: ProgramService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.programService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'programListModification',
                content: 'Deleted an program'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-program-delete-popup',
    template: ''
})
export class ProgramDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private programPopupService: ProgramPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.programPopupService
                .open(ProgramDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
