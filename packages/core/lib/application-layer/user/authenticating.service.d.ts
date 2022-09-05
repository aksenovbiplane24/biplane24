import { Either } from '@sweet-monads/either';
import { DomainError } from '../../domain-layer/common/errors/domain.error';
import { InfrastructureError } from '../../domain-layer/common/errors/infrastructure.error';
import { TokenEntity } from '../../domain-layer/token/token.entity';
import { GettingByEmailPort } from '../../domain-layer/user/ports/getting-by-email.port';
import { AuthenticatingUseCase } from '../../domain-layer/user/use-cases/authenticating.use-case';
export declare class AuthenticatingService implements AuthenticatingUseCase {
    private readonly _gettingPort;
    constructor(_gettingPort: GettingByEmailPort);
    auth(email: string, password: string): Promise<Either<DomainError, TokenEntity> | Either<InfrastructureError, TokenEntity>>;
}
