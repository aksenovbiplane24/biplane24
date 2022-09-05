import { Either } from '@sweet-monads/either';
import { EmailValueObject, GettingByEmailPort, InfrastructureError, UserAggregate } from 'core';
export declare class GettingByemailAdapter implements GettingByEmailPort {
    private readonly _store;
    constructor(_store: UserAggregate[]);
    get(email: EmailValueObject): Promise<Either<InfrastructureError, UserAggregate>>;
}
