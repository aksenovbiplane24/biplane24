import { Either } from '@sweet-monads/either';
import { DomainError } from "../common/errors/domain.error";
import { IdValueObjcet } from "../common/value-objects/id.value-object";
import { UserAggregate } from "../user/user.aggregate";
import { TokenValueObject } from "./value-objects/token.value-object";
export declare class TokenEntity {
    readonly token: TokenValueObject;
    readonly refreshToken: TokenValueObject;
    protected constructor(token: TokenValueObject, refreshToken: TokenValueObject);
    static new(secret: string, exp: number, user: UserAggregate): Either<DomainError, TokenEntity>;
    static validate(token: string, secret: string): Either<DomainError, IdValueObjcet>;
}
