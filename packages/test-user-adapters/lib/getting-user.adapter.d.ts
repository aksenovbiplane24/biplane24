import { Either } from '@sweet-monads/either';
import { GettingPort, IdValueObjcet, InfrastructureError, UserAggregate } from 'core';
export declare class GettingAdapter implements GettingPort {
    private readonly _store;
    constructor(_store: UserAggregate[]);
    get(id: IdValueObjcet): Promise<Either<InfrastructureError, UserAggregate>>;
}
