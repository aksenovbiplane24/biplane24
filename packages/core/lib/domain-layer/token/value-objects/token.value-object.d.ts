import { Either } from '@sweet-monads/either';
import { DomainError } from "../../common/errors/domain.error";
export declare class TokenValueObject {
    readonly value: string;
    protected constructor(value: string);
    static new(secret: string, exp: number, id: string): Either<DomainError, TokenValueObject>;
}
