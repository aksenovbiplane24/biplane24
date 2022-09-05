import { Either, left } from "@sweet-monads/either";
import { AuthorizatingUseCase } from "../../domain-layer/user/use-cases/authorizating.use-case";
import { CreatingUseCase } from '../../domain-layer/mark/use-cases/creating.use-case';
import { DomainError } from "../../domain-layer/common/errors/domain.error";
import { InfrastructureError } from "../../domain-layer/common/errors/infrastructure.error";
import { CreatingPort } from "../../domain-layer/mark/ports/creating-port";
import { MarkeAggregate } from "../../domain-layer/mark/mark.agreegate";
import { CreatingForUseCaseDto } from "src/domain-layer/mark/dtos/creating-for-use-case.dto";

export class CreatingService implements CreatingUseCase {
  constructor(
    private readonly _authorizatingUseCase: AuthorizatingUseCase,
    private readonly _creatingPort: CreatingPort
  ) {

  }

  async create(dto: CreatingForUseCaseDto, token: string): Promise<Either<InfrastructureError, boolean> | Either<DomainError, boolean>> {
    const maybeUserEntity = await this._authorizatingUseCase.auth(token) 
    if (maybeUserEntity.isLeft()) {
      return left(maybeUserEntity.value)
    }
    
    const maybeTrue = maybeUserEntity.value.demandRight('ADMIN_MARK')
    if (maybeTrue.isLeft()) {
      return left(maybeTrue.value)
    }

    const maybeMark = MarkeAggregate.new({...dto, idUser: maybeUserEntity.value.id.value})
    if (maybeMark.isLeft()) {
      return left(maybeMark.value)
    }

    return this._creatingPort.create(maybeMark.value)
  }
}