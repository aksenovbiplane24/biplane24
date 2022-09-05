import { Either, left, right } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";

export type NameRight = 'GLOBAL_ADMIN' | 'ADMIN_MARK' | 'ADMIN_DASHBOARD'

export class RightNameValueObject {
  protected constructor(
    readonly value: NameRight
  ){}

  static new(name: string): Either<DomainError, RightNameValueObject>  {
    if (typeof name != 'string') {
      return left(new DomainError('Invalid name of sytem right'))
    }

    if (name != 'GLOBAL_ADMIN' && name != 'ADMIN_MARK' && name != 'ADMIN_DASHBOARD') {
      return left(new DomainError('Invalid name of sytem right'))
    }

    return right(new RightNameValueObject(name))
  }
}