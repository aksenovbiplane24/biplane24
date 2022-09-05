import { Either, left, right } from "@sweet-monads/either";
import { DomainError } from "../common/errors/domain.error";
import { IdValueObjcet } from "../common/value-objects/id.value-object";
import { CreatingDto } from "./dtos/creating.dto";
import { SytemRightEntity } from "./system-right.entity";
import { EmailValueObject } from "./value-objects/email.value-object";
import { PasswordValueObject } from "./value-objects/password.value-object";
import { NameRight } from "./value-objects/right-name.value-object";

export class UserAggregate {
  protected constructor(
    readonly id: IdValueObjcet,
    readonly email: EmailValueObject,
    readonly password: PasswordValueObject,
    readonly rights: SytemRightEntity[]
  ){}

  static new(dto: CreatingDto): Either<DomainError, UserAggregate> {
    const maybeEmail = EmailValueObject.new(dto.email)
    if (maybeEmail.isLeft()) {
      return left(maybeEmail.value)
    }

    const maybePassword = PasswordValueObject.new(dto.password)
    if (maybePassword.isLeft()) {
      return left(maybePassword.value)
    }

    const id = IdValueObjcet.new()

    const maybeRight = SytemRightEntity.new(id, 'ADMIN_DASHBOARD', 'You can admin any dashoboards')
    if (maybeRight.isLeft()) {
      return left(maybeRight.value)
    }

    return right(new UserAggregate(
      id,
      maybeEmail.value,
      maybePassword.value,
      [maybeRight.value]
    ))
  }

  verifyPassword(password: string): Either<DomainError, boolean> {
    const maybeTrue = this.password.verify(password)
    if (maybeTrue.isLeft()) {
      return left(maybeTrue.value)
    }

    return right(true)
  }

  demandRight(nameRight: NameRight): Either<DomainError, boolean> {
    const maybeRight = this.rights.find(el => el.name.value == nameRight)
    if (!maybeRight) {
      return left(new DomainError('You have not right for execute this opertion'))
    }

    return right(true)
  }
}