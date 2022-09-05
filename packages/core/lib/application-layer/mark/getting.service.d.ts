import { Either } from "@sweet-monads/either";
import { DomainError } from "../../domain-layer/common/errors/domain.error";
import { InfrastructureError } from "../../domain-layer/common/errors/infrastructure.error";
import { MarkeAggregate } from "../../domain-layer/mark/mark.agreegate";
import { GettingPort } from "../../domain-layer/mark/ports/getting.port";
import { GettingUseCase } from "../../domain-layer/mark/use-cases/getting.use-case";
import { AuthorizatingUseCase } from "../../domain-layer/user/use-cases/authorizating.use-case";
export declare class GettingService implements GettingUseCase {
    private readonly _authorizatingUseCase;
    private readonly _gettingPort;
    constructor(_authorizatingUseCase: AuthorizatingUseCase, _gettingPort: GettingPort);
    get(id: string, token: string): Promise<Either<DomainError, MarkeAggregate> | Either<InfrastructureError, MarkeAggregate>>;
}
