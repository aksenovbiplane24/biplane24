import { Either, left, right } from '@sweet-monads/either';
import { GettingPort, IdValueObjcet, InfrastructureError, UserAggregate } from 'core';

export class GettingAdapter implements GettingPort {
  constructor(
    private readonly _store: UserAggregate[]
  ){}

  async get(id: IdValueObjcet): Promise<Either<InfrastructureError, UserAggregate>> {
    const maybeuser = this._store.find(el => el.id.value == id.value)
    if (maybeuser) {
      return right(maybeuser)
    } else { 
      return left(new InfrastructureError('User not found'))
    }
  }
}