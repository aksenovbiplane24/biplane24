import { Either } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";
export declare class PasswordValueObject {
    readonly value: string;
    protected constructor(value: string);
    static new(password: string): Either<DomainError, PasswordValueObject>;
    verify(password: string): Either<DomainError, boolean>;
}
