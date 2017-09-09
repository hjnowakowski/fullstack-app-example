import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Discipline } from './discipline.model';
import { DisciplineService } from './discipline.service';

@Component({
    selector: 'jhi-discipline-detail',
    templateUrl: './discipline-detail.component.html'
})
export class DisciplineDetailComponent implements OnInit, OnDestroy {

    discipline: Discipline;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private disciplineService: DisciplineService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDisciplines();
    }

    load(id) {
        this.disciplineService.find(id).subscribe((discipline) => {
            this.discipline = discipline;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDisciplines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'disciplineListModification',
            (response) => this.load(this.discipline.id)
        );
    }
}
