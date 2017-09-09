import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Program } from './program.model';
import { ProgramService } from './program.service';

@Component({
    selector: 'jhi-program-detail',
    templateUrl: './program-detail.component.html'
})
export class ProgramDetailComponent implements OnInit, OnDestroy {

    program: Program;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private programService: ProgramService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrograms();
    }

    load(id) {
        this.programService.find(id).subscribe((program) => {
            this.program = program;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrograms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'programListModification',
            (response) => this.load(this.program.id)
        );
    }
}
