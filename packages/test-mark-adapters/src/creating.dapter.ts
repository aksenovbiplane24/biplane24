import { Either, right } from '@sweet-monads/either';
import { CreatingMarkPort, InfrastructureError, MarkeAggregate } from 'core';

export class CreatingMarkAdapter implements CreatingMarkPort {
  constructor(
    private readonly _store: MarkeAggregate[]
  ){}

  async create(mark: MarkeAggregate): Promise<Either<InfrastructureError, boolean>> {
    this._store.push(mark)
    return right(true)
  }
}