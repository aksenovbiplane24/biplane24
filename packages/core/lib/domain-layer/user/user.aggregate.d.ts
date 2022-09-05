import { Either } from "@sweet-monads/either";
import { DomainError } from "../common/errors/domain.error";
import { IdValueObjcet } from "../common/value-objects/id.value-object";
import { CreatingDto } from "./dtos/creating.dto";
import { SytemRightEntity } from "./system-right.entity";
import { EmailValueObject } from "./value-objects/email.value-object";
import { PasswordValueObject } from "./value-objects/password.value-object";
import { NameRight } from "./value-objects/right-name.value-object";
export declare class UserAggregate {
    readonly id: IdValueObjcet;
    readonly email: EmailValueObject;
    readonly password: PasswordValueObject;
    readonly rights: SytemRightEntity[];
    protected constructor(id: IdValueObjcet, email: EmailValueObject, password: PasswordValueObject, rights: SytemRightEntity[]);
    static new(dto: CreatingDto): Either<DomainError, UserAggregate>;
    verifyPassword(password: string): Either<DomainError, boolean>;
    demandRight(nameRight: NameRight): Either<DomainError, boolean>;
}
