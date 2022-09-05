import {  Either, left, right } from '@sweet-monads/either';
import { DomainError } from '../common/errors/domain.error';
import { IdValueObjcet } from '../common/value-objects/id.value-object';
import { RightValueObject } from './value-objects/right.value-object';
import { CreatedValueObject } from '../common/value-objects/created.value-object';
import { OperationName } from './mark.agreegate';

export class RightsMarkEntity {
  protected constructor(
    readonly id: IdValueObjcet,
    readonly idMark: IdValueObjcet,
    readonly ownOnlyRight: RightValueObject,
    readonly readOnlyForAllRight: RightValueObject,
    readonly writeAndReadForAllRight: RightValueObject,
    readonly created: CreatedValueObject
  ){}

  static new(idMark: string): Either<DomainError, RightsMarkEntity> {
    const maybeId = IdValueObjcet.fromOrigin(idMark)
    if (maybeId.isLeft()) {
      return left(maybeId.value)
    }

    const maybeCreated = CreatedValueObject.new(new Date())
    if (maybeCreated.isLeft()) {
      return left(maybeCreated.value)
    }

    return right(new RightsMarkEntity(
      IdValueObjcet.new(),
      maybeId.value,
      RightValueObject.fromOrigin(true),
      RightValueObject.fromOrigin(false),
      RightValueObject.fromOrigin(false),
      maybeCreated.value
    ))
  }

  checkRight(operation: OperationName): Either<DomainError, boolean> {
    if (typeof operation != 'string') {
      return left(new DomainError('Invalid name operation'))
    }

    if (operation != 'READ' && operation != 'WRITE_AND_READ') {
      return left(new DomainError('Invalid name operation'))
    }

    if (operation == 'READ') {
      if (this.readOnlyForAllRight.value == false) {
        return left(new DomainError('You have not right for execute this operation'))
      }
      return right(this.readOnlyForAllRight.value)
    }

    if (this.writeAndReadForAllRight.value == false) {
      return left(new DomainError('You have not right for execute this operation'))
    }

    return right(this.writeAndReadForAllRight.value)
  }

  setRight(operation: OperationName): Either<DomainError, RightsMarkEntity> {
    if (typeof operation != 'string') {
      return left(new DomainError('Invalid operation'))
    }

    if (operation != 'READ' && operation != 'WRITE_AND_READ') {
      return left(new DomainError('Invalid operation'))
    }

    if (operation == 'READ') {
      return right(new RightsMarkEntity(
        this.id,
        this.idMark,
        RightValueObject.fromOrigin(true),
        RightValueObject.fromOrigin(true),
        RightValueObject.fromOrigin(false),
        this.created
      ))
    }

    return right(new RightsMarkEntity(
      this.id,
      this.idMark,
      RightValueObject.fromOrigin(true),
      RightValueObject.fromOrigin(true),
      RightValueObject.fromOrigin(true),
      this.created
    ))
  }

  setRightDefault(): RightsMarkEntity {
    return new RightsMarkEntity(
      this.id,
      this.idMark,
      RightValueObject.fromOrigin(true),
      RightValueObject.fromOrigin(false),
      RightValueObject.fromOrigin(false),
      this.created
    )
  }
}