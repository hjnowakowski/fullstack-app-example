import { BaseEntity } from './../../shared';

const enum Level {
    'NOVICE',
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'PROFESSIONAL'
}

export class Course implements BaseEntity {
    constructor(
        public id?: number,
        public courseTitle?: string,
        public courseDescription?: string,
        public coursePrice?: number,
        public courseLevel?: Level,
        public resources?: BaseEntity[],
        public lessons?: BaseEntity[],
        public programs?: BaseEntity[],
    ) {
    }
}
