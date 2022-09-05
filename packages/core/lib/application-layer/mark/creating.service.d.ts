import { Either } from "@sweet-monads/either";
import { AuthorizatingUseCase } from "../../domain-layer/user/use-cases/authorizating.use-case";
import { CreatingUseCase } from '../../domain-layer/mark/use-cases/creating.use-case';
import { DomainError } from "../../domain-layer/common/errors/domain.error";
import { InfrastructureError } from "../../domain-layer/common/errors/infrastructure.error";
import { CreatingPort } from "../../domain-layer/mark/ports/creating-port";
import { CreatingForUseCaseDto } from "src/domain-layer/mark/dtos/creating-for-use-case.dto";
export declare class CreatingService implements CreatingUseCase {
    private readonly _authorizatingUseCase;
    private readonly _creatingPort;
    constructor(_authorizatingUseCase: AuthorizatingUseCase, _creatingPort: CreatingPort);
    create(dto: CreatingForUseCaseDto, token: string): Promise<Either<InfrastructureError, boolean> | Either<DomainError, boolean>>;
}
