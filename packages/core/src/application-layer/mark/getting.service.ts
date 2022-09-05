import { Either, left, right } from "@sweet-monads/either";
import { DomainError } from "../../domain-layer/common/errors/domain.error";
import { InfrastructureError } from "../../domain-layer/common/errors/infrastructure.error";
import { IdValueObjcet } from "../../domain-layer/common/value-objects/id.value-object";
import { MarkeAggregate } from "../../domain-layer/mark/mark.agreegate";
import { GettingPort } from "../../domain-layer/mark/ports/getting.port";
import { GettingUseCase } from "../../domain-layer/mark/use-cases/getting.use-case";
import { AuthorizatingUseCase } from "../../domain-layer/user/use-cases/authorizating.use-case";

export class GettingService implements GettingUseCase {
  constructor(
    private readonly _authorizatingUseCase: AuthorizatingUseCase,
    private readonly _gettingPort: GettingPort
  ){}
  
  async get(id: string, token: string): 
    Promise<Either<DomainError, MarkeAggregate> | Either<InfrastructureError, MarkeAggregate>> {
    
    const maybeUserEntity = await this._authorizatingUseCase.auth(token) 
    if (maybeUserEntity.isLeft()) {
      return left(maybeUserEntity.value)
    } 

    const maybeIdMark = IdValueObjcet.fromOrigin(id)
    if (maybeIdMark.isLeft()) {
      return left(maybeIdMark.value)
    }

    const maybeMark = await this._gettingPort.get(maybeIdMark.value, maybeUserEntity.value.id)
    if (maybeMark.isLeft()) {
      return left(maybeMark.value)
    }

    const maybeTrue = maybeMark.value.demandRight(maybeUserEntity.value.id, 'READ')
    if (maybeTrue.isLeft()) {
      return left(maybeTrue.value)
    }

    return right(maybeMark.value)
  }
}