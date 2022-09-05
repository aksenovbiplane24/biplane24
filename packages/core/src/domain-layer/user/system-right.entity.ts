import { Either, left, right } from "@sweet-monads/either";
import { DomainError } from "../common/errors/domain.error";
import { CreatedValueObject } from "../common/value-objects/created.value-object";
import { IdValueObjcet } from "../common/value-objects/id.value-object";
import { RightDescriptionValueObject } from "./value-objects/right-description.value-object";
import { NameRight, RightNameValueObject } from "./value-objects/right-name.value-object";

export class SytemRightEntity {
  protected constructor(
    readonly id: IdValueObjcet,
    readonly idUser: IdValueObjcet,
    readonly name: RightNameValueObject,
    readonly description: RightDescriptionValueObject,
    readonly created: CreatedValueObject
  ){}

  static new(
    idUser: IdValueObjcet, 
    name: NameRight, 
    description: string
  ): Either<DomainError, SytemRightEntity> {
    const maybeNameRight = RightNameValueObject.new(name)
    if (maybeNameRight.isLeft()) {
      return left(maybeNameRight.value)
    }

    const maybeDescRight = RightDescriptionValueObject.new(description)
    if (maybeDescRight.isLeft()) {
      return left(maybeDescRight.value)
    }

    const maybeCreated = CreatedValueObject.new(new Date())
    if (maybeCreated.isLeft()) {
      return left(maybeCreated.value)
    }

    return right(new SytemRightEntity(
      IdValueObjcet.new(),
      idUser,
      maybeNameRight.value,
      maybeDescRight.value,
      maybeCreated.value
    ))
  }
}