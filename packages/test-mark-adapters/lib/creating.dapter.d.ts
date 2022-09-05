import { Either } from '@sweet-monads/either';
import { CreatingMarkPort, InfrastructureError, MarkeAggregate } from 'core';
export declare class CreatingMarkAdapter implements CreatingMarkPort {
    private readonly _store;
    constructor(_store: MarkeAggregate[]);
    create(mark: MarkeAggregate): Promise<Either<InfrastructureError, boolean>>;
}
