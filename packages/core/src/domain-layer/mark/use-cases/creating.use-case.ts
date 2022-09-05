import { Either } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";
import { InfrastructureError } from "../../common/errors/infrastructure.error";
import { CreatingForUseCaseDto } from "../dtos/creating-for-use-case.dto";

export interface CreatingUseCase {
  create(
    dto: CreatingForUseCaseDto,
    token: string
  ): Promise<Either<InfrastructureError, boolean> | Either<DomainError, boolean>>
}