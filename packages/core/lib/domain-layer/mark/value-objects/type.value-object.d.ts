import { DomainError } from "../../common/errors/domain.error";
import { Either } from '@sweet-monads/either';
declare type TypeofMArk = 'TURNOVER' | 'ACTUAL';
export declare class TypeValueObject {
    readonly value: TypeofMArk;
    protected constructor(value: TypeofMArk);
    static new(type: string): Either<DomainError, TypeValueObject>;
}
export {};
