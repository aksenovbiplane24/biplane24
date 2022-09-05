import { Either, left, right } from '@sweet-monads/either';
import { EmailValueObject, GettingByEmailPort, InfrastructureError, UserAggregate } from 'core';

export class GettingByemailAdapter implements GettingByEmailPort {
  constructor(
    private readonly _store: UserAggregate[]
  ){}

  async get(email: EmailValueObject): Promise<Either<InfrastructureError, UserAggregate>> {
    const maybeuser = this._store.find(el => el.email.value == email.value)
    if (maybeuser) {
      return right(maybeuser)
    } else { 
      return left(new InfrastructureError('User not found'))
    }
  }
}