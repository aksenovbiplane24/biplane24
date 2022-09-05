import {  Either, left, right } from '@sweet-monads/either';
import { DomainError } from '../../common/errors/domain.error';

export class FormaulaValueObject {
  protected constructor(
    readonly value: string
  ){}

  static new(formula: string): Either<DomainError, FormaulaValueObject> {
    if (typeof formula != 'string') {
      return left(new DomainError('Formula must be string'))
    }

    if (!formula.match(/^[0-9\*\/\-\+]+$/)) {
      return left(new DomainError('Formula contains invalid value'))
    }
    //need parser formul

    return right(new FormaulaValueObject(formula))
  }
}