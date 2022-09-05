import { DomainError } from "../../common/errors/domain.error"
import { left, right, Either } from '@sweet-monads/either';

export class EmailValueObject {
  protected constructor(
    readonly value: string
  ){}

  public static new(email: string): Either<DomainError, EmailValueObject> {
    if(typeof email != 'string')
      return left(new DomainError("Invalid email address"))

    if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/))
      return left(new DomainError("Invalid email address"))

    return right(new EmailValueObject(email))
  }
}