import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ArmoryDisciplineModule } from './discipline/discipline.module';
import { ArmoryProgramModule } from './program/program.module';
import { ArmoryCourseModule } from './course/course.module';
import { ArmoryLessonModule } from './lesson/lesson.module';
import { ArmoryResourceModule } from './resource/resource.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ArmoryDisciplineModule,
        ArmoryProgramModule,
        ArmoryCourseModule,
        ArmoryLessonModule,
        ArmoryResourceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryEntityModule {}
