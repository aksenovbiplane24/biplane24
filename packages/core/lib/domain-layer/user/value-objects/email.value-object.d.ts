import { DomainError } from "../../common/errors/domain.error";
import { Either } from '@sweet-monads/either';
export declare class EmailValueObject {
    readonly value: string;
    protected constructor(value: string);
    static new(email: string): Either<DomainError, EmailValueObject>;
}
