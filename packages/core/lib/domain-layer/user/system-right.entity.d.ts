import { Either } from "@sweet-monads/either";
import { DomainError } from "../common/errors/domain.error";
import { CreatedValueObject } from "../common/value-objects/created.value-object";
import { IdValueObjcet } from "../common/value-objects/id.value-object";
import { RightDescriptionValueObject } from "./value-objects/right-description.value-object";
import { NameRight, RightNameValueObject } from "./value-objects/right-name.value-object";
export declare class SytemRightEntity {
    readonly id: IdValueObjcet;
    readonly idUser: IdValueObjcet;
    readonly name: RightNameValueObject;
    readonly description: RightDescriptionValueObject;
    readonly created: CreatedValueObject;
    protected constructor(id: IdValueObjcet, idUser: IdValueObjcet, name: RightNameValueObject, description: RightDescriptionValueObject, created: CreatedValueObject);
    static new(idUser: IdValueObjcet, name: NameRight, description: string): Either<DomainError, SytemRightEntity>;
}
