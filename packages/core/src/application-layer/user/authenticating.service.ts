import { Either, left } from '@sweet-monads/either';
import { DomainError } from '../../domain-layer/common/errors/domain.error';
import { InfrastructureError } from '../../domain-layer/common/errors/infrastructure.error';
import { TokenEntity } from '../../domain-layer/token/token.entity';
import { GettingByEmailPort } from '../../domain-layer/user/ports/getting-by-email.port';
import { AuthenticatingUseCase } from '../../domain-layer/user/use-cases/authenticating.use-case';
import { EmailValueObject } from '../../domain-layer/user/value-objects/email.value-object';

export class AuthenticatingService implements AuthenticatingUseCase {
  constructor(
    private readonly _gettingPort: GettingByEmailPort
  ){}
  
   async auth(email: string, password: string): Promise<Either<DomainError, TokenEntity> | Either<InfrastructureError, TokenEntity>> {
    const maybeEmail = EmailValueObject.new(email)
    if (maybeEmail.isLeft()) {
      return left(maybeEmail.value)
    }

    const maybeUser = await this._gettingPort.get(maybeEmail.value)
    if (maybeUser.isLeft()) {
      return left(maybeUser.value)
    }

    const maybeTrue = maybeUser.value.verifyPassword(password)
    if (maybeTrue.isLeft()) {
      return left(maybeTrue.value)
    }

    return TokenEntity.new("secret", 600, maybeUser.value)
  }
}