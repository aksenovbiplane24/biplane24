import {  Either, left, right } from '@sweet-monads/either';
import { DomainError } from '../common/errors/domain.error';
import { CreatedValueObject } from '../common/value-objects/created.value-object';
import { IdValueObjcet } from '../common/value-objects/id.value-object';
import { NameValueObject } from '../common/value-objects/name.value-object';
import { CreatingDto } from './dtos/creating.dto';
import { RightsMarkEntity } from './rights-mark.entity';
import { RightsMarkUserEntity } from './rights-mark-user.entity';
import { FormaulaValueObject } from './value-objects/formula.value-object';
import { TypeValueObject } from './value-objects/type.value-object';

export type OperationName = 'READ' | 'WRITE_AND_READ'

export class MarkeAggregate {
  protected constructor (
    readonly id: IdValueObjcet,
    readonly name: NameValueObject,
    readonly formula: FormaulaValueObject,
    readonly type: TypeValueObject,
    readonly globalRight: RightsMarkEntity,
    readonly userRights: RightsMarkUserEntity[],
    readonly created: CreatedValueObject,
  ){}

  static new(dto: CreatingDto): Either<DomainError, MarkeAggregate> {
    const maybeIdUser = IdValueObjcet.fromOrigin(dto.name)
    if (maybeIdUser.isLeft()) {
      return left(maybeIdUser.value)
    }

    const maybeName = NameValueObject.new(dto.name)
    if (maybeName.isLeft()) {
      return left(maybeName.value)
    }

    const maybeFormula = FormaulaValueObject.new(dto.formula)
    if (maybeFormula.isLeft()) {
      return left(maybeFormula.value)
    }

    const maybeType = TypeValueObject.new(dto.type)
    if (maybeType.isLeft()) {
      return left(maybeType.value)
    }

    const maybeCrated = CreatedValueObject.new(new Date())
    if (maybeCrated.isLeft()) {
      return left(maybeCrated.value)
    }

    const id = IdValueObjcet.new()

    const maybeRightEntity = RightsMarkEntity.new(id.value)
    if (maybeRightEntity.isLeft()) {
      return left(maybeRightEntity.value)
    }

    const maybeUserRightsEntity = RightsMarkUserEntity.newForOwn(id, maybeIdUser.value)
    if (maybeUserRightsEntity.isLeft()) {
      return left(maybeUserRightsEntity.value)
    }

    return right(new MarkeAggregate(
      IdValueObjcet.new(),
      maybeName.value,
      maybeFormula.value,
      maybeType.value,
      maybeRightEntity.value,
      [maybeUserRightsEntity.value],
      maybeCrated.value,
    ))
  }

  addRightForUser(userId: IdValueObjcet, operation: OperationName): Either<DomainError, MarkeAggregate> {
    const maybeUserRightsEntity = RightsMarkUserEntity.newForUser(this.id, userId, operation)
    if (maybeUserRightsEntity.isLeft()) {
      return left(maybeUserRightsEntity.value)
    }

    return right(new MarkeAggregate(
      this.id,
      this.name,
      this.formula,
      this.type,
      this.globalRight,
      [...this.userRights, maybeUserRightsEntity.value],
      this.created
    ))
  }

  demandRight(userId: IdValueObjcet, operation: OperationName): Either<DomainError, boolean> {
    const maybeTrue = this.globalRight.checkRight(operation)
    if (maybeTrue.isRight()) {
      return right(maybeTrue.value)
    } else {
      const maybeUserRight = this.userRights.find(elem => elem.id.value == userId.value)
      if (!maybeUserRight) {
        return left(new DomainError('You have not right for execute this operation'))
      }

      const maybeTrue = maybeUserRight.demandRight(operation)
      if (maybeTrue.isLeft()) {
        return left(maybeTrue.value)
      }

      return right(true)
    }
  }
}