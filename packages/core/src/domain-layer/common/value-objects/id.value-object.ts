
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { DomainError } from "../errors/domain.error";
import { left, right, Either } from '@sweet-monads/either';

export class IdValueObjcet {
  protected constructor(
    value: string
  ){
    this.value =  value
  }

  readonly value: string

  static new(): IdValueObjcet {
    return new IdValueObjcet(uuidv4())
  }

  static fromOrigin(id: string): Either<DomainError, IdValueObjcet> {
    if (typeof id != 'string') {
      return left(new DomainError('Id is invalid'))
    }

    if (!uuidValidate(id)) {
      return left(new DomainError('Id is invalid'))
    }
    
    return right(new IdValueObjcet(id))
  }
}