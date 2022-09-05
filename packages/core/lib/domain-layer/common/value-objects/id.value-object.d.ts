import { DomainError } from "../errors/domain.error";
import { Either } from '@sweet-monads/either';
export declare class IdValueObjcet {
    protected constructor(value: string);
    readonly value: string;
    static new(): IdValueObjcet;
    static fromOrigin(id: string): Either<DomainError, IdValueObjcet>;
}
