import { Either, left, right } from '@sweet-monads/either';
import { GettingMarkPort, IdValueObjcet, InfrastructureError, MarkeAggregate } from 'core';

export class GettingMarkAdapter implements GettingMarkPort {
  constructor(
    private readonly _store: MarkeAggregate[]
  ){}

  async get(id: IdValueObjcet, idUser: IdValueObjcet): Promise<Either<InfrastructureError, MarkeAggregate>> {
    const maybeMark = this._store.find(el => el.id.value == id.value)
    if (maybeMark) {
      return right(maybeMark)
    } else {
      return left(new InfrastructureError('Mark not found'))
    }
  }
}