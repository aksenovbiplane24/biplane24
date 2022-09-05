import { Either } from '@sweet-monads/either';
import { GettingMarkPort, IdValueObjcet, InfrastructureError, MarkeAggregate } from 'core';
export declare class GettingMarkAdapter implements GettingMarkPort {
    private readonly _store;
    constructor(_store: MarkeAggregate[]);
    get(id: IdValueObjcet, idUser: IdValueObjcet): Promise<Either<InfrastructureError, MarkeAggregate>>;
}
