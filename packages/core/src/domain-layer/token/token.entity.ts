import { left, right, Either } from '@sweet-monads/either';
import { verify } from 'jsonwebtoken';
import { DomainError } from "../common/errors/domain.error";
import { IdValueObjcet } from "../common/value-objects/id.value-object";
import { UserAggregate } from "../user/user.aggregate";
import { TokenValueObject } from "./value-objects/token.value-object";

export class TokenEntity {
  protected constructor(
    readonly token: TokenValueObject,
    readonly refreshToken: TokenValueObject
  ) {}

  public static new(
    secret: string, exp: number, user: UserAggregate
  ): Either<DomainError, TokenEntity> {
    const maybeTokenValue = TokenValueObject.new(secret, exp, user.id.value)
    const maybeRefreshTokenValue = TokenValueObject.new(secret, exp*4, user.id.value)

    if (maybeTokenValue.isLeft())
      return left(maybeTokenValue.value)

    if (maybeRefreshTokenValue.isLeft())
      return left(maybeRefreshTokenValue.value)

    return right(new TokenEntity(maybeTokenValue.value, maybeRefreshTokenValue.value))
  }

  public static validate(
    token: string,
    secret: string
  ): Either<DomainError, IdValueObjcet> {
    try {
      if (typeof token != 'string') {
        return left(new DomainError('Token is invalid'))
      }
      let decoded = verify(token, secret)
      if (typeof decoded != 'string') {
        return IdValueObjcet.fromOrigin(decoded.id)
      } else {
        return  left(new DomainError('Invalid Payload'))
      }
    } catch(err) {
      return left(new DomainError('Token is invalid'))
    }
  }
}