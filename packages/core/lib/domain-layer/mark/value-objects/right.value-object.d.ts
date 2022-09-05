import { Either } from '@sweet-monads/either';
import { DomainError } from '../../common/errors/domain.error';
export declare class RightValueObject {
    readonly value: boolean;
    protected constructor(value: boolean);
    static new(havings: boolean): Either<DomainError, RightValueObject>;
    static fromOrigin(value: boolean): RightValueObject;
}
