import {  Either, left, right } from '@sweet-monads/either';
import { DomainError } from '../../common/errors/domain.error';

export class RightValueObject {
  protected constructor(
    readonly value: boolean
  ){}

  static new(havings: boolean): Either<DomainError, RightValueObject> {
    if (typeof havings != 'boolean') {
      return left(new DomainError('Invalid havings'))
    }

    return right(new RightValueObject(havings))
  }

  static fromOrigin(value: boolean): RightValueObject {
    return new RightValueObject(value)
  }
}