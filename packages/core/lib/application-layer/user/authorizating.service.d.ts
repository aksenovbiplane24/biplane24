import { Either } from "@sweet-monads/either";
import { DomainError } from "../../domain-layer/common/errors/domain.error";
import { InfrastructureError } from "../../domain-layer/common/errors/infrastructure.error";
import { GettingPort } from "../../domain-layer/user/ports/getting.port";
import { AuthorizatingUseCase } from "../../domain-layer/user/use-cases/authorizating.use-case";
import { UserAggregate } from "../../domain-layer/user/user.aggregate";
export declare class AuthorizatingService implements AuthorizatingUseCase {
    private readonly _gettingPort;
    constructor(_gettingPort: GettingPort);
    auth(token: string): Promise<Either<InfrastructureError, UserAggregate> | Either<DomainError, UserAggregate>>;
}
