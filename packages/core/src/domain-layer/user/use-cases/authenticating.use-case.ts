import { Either } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";
import { InfrastructureError } from "../../common/errors/infrastructure.error";
import { TokenEntity } from "../../token/token.entity";

export interface AuthenticatingUseCase {
  auth(email: string, password: string): Promise<Either<InfrastructureError, TokenEntity> | Either<DomainError, TokenEntity>>
}