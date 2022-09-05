import { DomainError } from "../errors/domain.error";
import { left, right, Either } from '@sweet-monads/either';

export class CreatedValueObject {
  protected constructor(
    readonly value: Date
  ) {}

  public static new(date: Date) : Either<DomainError, CreatedValueObject> {
    if ((date instanceof Date) == false) {
      return left(new DomainError("Date is invalid"))
    }
    
    return right(new CreatedValueObject(date))
  }
}