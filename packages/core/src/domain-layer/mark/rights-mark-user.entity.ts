import {  Either, left, right } from '@sweet-monads/either';
import { DomainError } from '../common/errors/domain.error';
import { CreatedValueObject } from '../common/value-objects/created.value-object';
import { IdValueObjcet } from '../common/value-objects/id.value-object';
import { OperationName } from './mark.agreegate';
import { RightValueObject } from './value-objects/right.value-object';

export class RightsMarkUserEntity {
  protected constructor(
    readonly id: IdValueObjcet,
    readonly idMark: IdValueObjcet,
    readonly idUser: IdValueObjcet,
    readonly readOnlyRight: RightValueObject,
    readonly writeAndReadRight: RightValueObject,
    readonly created: CreatedValueObject
  ){}

  static newForOwn(idMark: IdValueObjcet, idUser: IdValueObjcet): Either<DomainError, RightsMarkUserEntity> {
    const maybeCreated = CreatedValueObject.new(new Date())
    if (maybeCreated.isLeft()) {
      return left(maybeCreated.value)
    }

    return right(new RightsMarkUserEntity(
      IdValueObjcet.new(),
      idMark,
      idUser,
      RightValueObject.fromOrigin(true),
      RightValueObject.fromOrigin(true),
      maybeCreated.value
    ))
  }

  static newForUser(
    idMark: IdValueObjcet, 
    idUser: IdValueObjcet, 
    operation: OperationName
  ): Either<DomainError, RightsMarkUserEntity> {
    const maybeCreated = CreatedValueObject.new(new Date())
    if (maybeCreated.isLeft()) {
      return left(maybeCreated.value)
    }

    if (typeof operation != 'string') {
      return left(new DomainError('Invalid operation'))
    }

    if (operation != 'READ' && operation != 'WRITE_AND_READ') {
      return left(new DomainError('Invalid operation'))
    }

    if (operation == 'READ') {
      return right(new RightsMarkUserEntity(
        IdValueObjcet.new(),
        idMark,
        idUser,
        RightValueObject.fromOrigin(true),
        RightValueObject.fromOrigin(false),
        maybeCreated.value
      ))
    }

    return right(new RightsMarkUserEntity(
      IdValueObjcet.new(),
      idMark,
      idUser,
      RightValueObject.fromOrigin(true),
      RightValueObject.fromOrigin(true),
      maybeCreated.value
    ))
  }

  setRight(operation: OperationName): Either<DomainError, RightsMarkUserEntity> {
    if (typeof operation != 'string') {
      return left(new DomainError('Invalid operation'))
    }

    if (operation != 'READ' && operation != 'WRITE_AND_READ') {
      return left(new DomainError('Invalid operation'))
    }

    if (operation == 'READ') {
      return right(new RightsMarkUserEntity(
        this.id,
        this.idMark,
        this.idUser,
        RightValueObject.fromOrigin(true),
        RightValueObject.fromOrigin(false),
        this.created
      ))
    }

    return right(new RightsMarkUserEntity(
      this.id,
        this.idMark,
        this.idUser,
        RightValueObject.fromOrigin(true),
        RightValueObject.fromOrigin(true),
        this.created
    ))
  }

  setRightDefault() {
    return right(new RightsMarkUserEntity(
      this.id,
        this.idMark,
        this.idUser,
        RightValueObject.fromOrigin(false),
        RightValueObject.fromOrigin(false),
        this.created
    ))
  }

  demandRight(operation: OperationName): Either<DomainError, boolean> {
    if (typeof operation != 'string') {
      return left(new DomainError('Invalid operation'))
    }

    if (operation != 'READ' && operation != 'WRITE_AND_READ') {
      return left(new DomainError('Invalid operation'))
    }

    if (operation == 'READ') {
      if (this.readOnlyRight.value == false) {
        return left(new DomainError('You have not right for execute this operation'))
      }
      return right(this.readOnlyRight.value)
    }

    if (this.writeAndReadRight.value == false) {
      return left(new DomainError('You have not right for execute this operation'))
    }

    return right(this.writeAndReadRight.value)
  }
}