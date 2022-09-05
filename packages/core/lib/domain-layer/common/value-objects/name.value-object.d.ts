import { Either } from '@sweet-monads/either';
import { DomainError } from '../errors/domain.error';
export declare class NameValueObject {
    readonly value: string;
    protected constructor(value: string);
    static new(name: string): Either<DomainError, NameValueObject>;
}
