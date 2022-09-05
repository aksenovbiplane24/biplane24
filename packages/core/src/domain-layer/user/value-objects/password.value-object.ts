import { Either, left, right } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";

export class PasswordValueObject {
  protected constructor(
    readonly value: string
  ){}

  static new(password: string): Either<DomainError, PasswordValueObject> {
    if (typeof password != 'string') {
      return left(new DomainError('Invalid password'))
    }

    if (password.length < 5 || password.length > 10) {
      return left(new DomainError('Invalid password'))
    }

    return right(new PasswordValueObject(password))
  }

  verify(password: string): Either<DomainError, boolean> {
    // Some code that makes compare hash password and password 
    if (password != this.value) {
      return left(new DomainError('Wrong password'))
    }

    return right(true)
  }
}