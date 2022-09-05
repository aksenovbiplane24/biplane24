import { Either, left } from "@sweet-monads/either";
import { DomainError } from "../../domain-layer/common/errors/domain.error";
import { InfrastructureError } from "../../domain-layer/common/errors/infrastructure.error";
import { TokenEntity } from "../../domain-layer/token/token.entity";
import { GettingPort } from "../../domain-layer/user/ports/getting.port";
import { AuthorizatingUseCase } from "../../domain-layer/user/use-cases/authorizating.use-case";
import { UserAggregate } from "../../domain-layer/user/user.aggregate";

export class AuthorizatingService implements AuthorizatingUseCase {
  constructor(
    private readonly _gettingPort: GettingPort
  ) {}

  async auth(token: string): Promise<Either<InfrastructureError, UserAggregate> | Either<DomainError, UserAggregate>> {
    const maybeId = TokenEntity.validate(token, 'secret')
    if (maybeId.isLeft()) {
      return left(maybeId.value)
    }

    return this._gettingPort.get(maybeId.value)
  }
}