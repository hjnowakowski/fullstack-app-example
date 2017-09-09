import { BaseEntity } from './../../shared';

export class Discipline implements BaseEntity {
    constructor(
        public id?: number,
        public disciplineName?: string,
        public disciplineDescription?: string,
        public disciplinePrice?: number,
        public resources?: BaseEntity[],
        public programs?: BaseEntity[],
    ) {
    }
}
