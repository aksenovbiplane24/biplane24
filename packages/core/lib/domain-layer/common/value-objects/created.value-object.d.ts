import { DomainError } from "../errors/domain.error";
import { Either } from '@sweet-monads/either';
export declare class CreatedValueObject {
    readonly value: Date;
    protected constructor(value: Date);
    static new(date: Date): Either<DomainError, CreatedValueObject>;
}
