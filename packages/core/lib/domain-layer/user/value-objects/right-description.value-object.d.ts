import { Either } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";
export declare class RightDescriptionValueObject {
    readonly value: string;
    protected constructor(value: string);
    static new(desc: string): Either<DomainError, RightDescriptionValueObject>;
}
