import { Either, left, right } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";

export class RightDescriptionValueObject {
  protected constructor(
    readonly value: string
  ){}

  static new(desc: string): Either<DomainError, RightDescriptionValueObject> {
    if (typeof desc != 'string') {
      return left(new DomainError('Invalid description of system right'))
    }

    return right(new RightDescriptionValueObject(desc))
  }
}