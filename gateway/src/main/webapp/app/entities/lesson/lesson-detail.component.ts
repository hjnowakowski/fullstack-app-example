import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Lesson } from './lesson.model';
import { LessonService } from './lesson.service';

@Component({
    selector: 'jhi-lesson-detail',
    templateUrl: './lesson-detail.component.html'
})
export class LessonDetailComponent implements OnInit, OnDestroy {

    lesson: Lesson;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lessonService: LessonService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLessons();
    }

    load(id) {
        this.lessonService.find(id).subscribe((lesson) => {
            this.lesson = lesson;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLessons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lessonListModification',
            (response) => this.load(this.lesson.id)
        );
    }
}
