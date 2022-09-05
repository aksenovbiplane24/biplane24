import { sign } from 'jsonwebtoken';
import { left, right, Either } from '@sweet-monads/either';
import { DomainError } from "../../common/errors/domain.error";

export class TokenValueObject {
  protected constructor(
    readonly value: string
  ) {}

    public static new(secret: string, exp: number, id: string): Either<DomainError, TokenValueObject> {
      if (typeof secret != 'string')
        return left(new DomainError('Secret is invalid'))

      if(typeof exp != 'number')
        return left(new DomainError('Expires is invalid'))
      
      if(typeof id != 'string')
        return left(new DomainError('Id is invalid'))

      return right(new TokenValueObject(sign({id: id}, secret)))
    }
}