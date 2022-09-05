import { Either } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";
export declare type NameRight = 'GLOBAL_ADMIN' | 'ADMIN_MARK' | 'ADMIN_DASHBOARD';
export declare class RightNameValueObject {
    readonly value: NameRight;
    protected constructor(value: NameRight);
    static new(name: string): Either<DomainError, RightNameValueObject>;
}
