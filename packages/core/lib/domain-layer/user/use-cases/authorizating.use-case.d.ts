import { Either } from "@sweet-monads/either";
import { DomainError } from "../../common/errors/domain.error";
import { InfrastructureError } from "../../common/errors/infrastructure.error";
import { UserAggregate } from "../user.aggregate";
export interface AuthorizatingUseCase {
    auth(token: string): Promise<Either<InfrastructureError, UserAggregate> | Either<DomainError, UserAggregate>>;
}
