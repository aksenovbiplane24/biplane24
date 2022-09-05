import { Either } from '@sweet-monads/either';
import { DomainError } from "../../common/errors/domain.error";
import { TokenEntity } from '../token.entity';
export interface RefreshingUseCase {
    refresh(token: string): Promise<Either<DomainError, TokenEntity>>;
}
