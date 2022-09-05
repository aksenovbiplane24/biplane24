import { DomainError } from "../../common/errors/domain.error";
import { left, right, Either } from '@sweet-monads/either';

type TypeofMArk = 'TURNOVER' | 'ACTUAL'

export class TypeValueObject {
  protected constructor(
    readonly value: TypeofMArk
  ){}

  static new(type: string): Either<DomainError, TypeValueObject> {
    if (typeof type != 'string') {
      return left(new DomainError('Invalid type of mark'))
    }

    if (type != 'TURNOVER' && type != 'ACTUAL') {
      return left(new DomainError(''))
    }

    return right(new TypeValueObject(type))
  }
}