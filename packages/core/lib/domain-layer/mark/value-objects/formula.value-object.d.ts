import { Either } from '@sweet-monads/either';
import { DomainError } from '../../common/errors/domain.error';
export declare class FormaulaValueObject {
    readonly value: string;
    protected constructor(value: string);
    static new(formula: string): Either<DomainError, FormaulaValueObject>;
}
