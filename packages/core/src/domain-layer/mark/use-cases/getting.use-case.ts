import { Either } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";
import { InfrastructureError } from "../../common/errors/infrastructure.error";
import { MarkeAggregate } from "../mark.agreegate";

export interface GettingUseCase {
  get(
    id: string,
    token: string
  ): Promise<Either<DomainError, MarkeAggregate> | Either<InfrastructureError, MarkeAggregate>>
}