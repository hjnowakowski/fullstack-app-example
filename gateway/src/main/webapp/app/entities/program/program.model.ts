import { BaseEntity } from './../../shared';

export class Program implements BaseEntity {
    constructor(
        public id?: number,
        public programName?: string,
        public programDescription?: string,
        public programPrice?: number,
        public resources?: BaseEntity[],
        public courses?: BaseEntity[],
        public disciplines?: BaseEntity[],
    ) {
    }
}
