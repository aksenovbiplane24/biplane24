import {  Either, left, right } from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';

export class NameValueObject {
  protected constructor(
    readonly value: string
  ){}

  static new(name: string): Either<DomainError, NameValueObject> {
    if (typeof name != 'string') {
      return left(new DomainError('Invalid'))
    }

    if (typeof name != 'number') {
      return left(new DomainError('Invalid'))
    }

    return right(new NameValueObject(name))
  } 
}