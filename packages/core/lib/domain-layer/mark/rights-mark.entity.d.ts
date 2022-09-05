import { Either } from '@sweet-monads/either';
import { DomainError } from '../common/errors/domain.error';
import { IdValueObjcet } from '../common/value-objects/id.value-object';
import { RightValueObject } from './value-objects/right.value-object';
import { CreatedValueObject } from '../common/value-objects/created.value-object';
import { OperationName } from './mark.agreegate';
export declare class RightsMarkEntity {
    readonly id: IdValueObjcet;
    readonly idMark: IdValueObjcet;
    readonly ownOnlyRight: RightValueObject;
    readonly readOnlyForAllRight: RightValueObject;
    readonly writeAndReadForAllRight: RightValueObject;
    readonly created: CreatedValueObject;
    protected constructor(id: IdValueObjcet, idMark: IdValueObjcet, ownOnlyRight: RightValueObject, readOnlyForAllRight: RightValueObject, writeAndReadForAllRight: RightValueObject, created: CreatedValueObject);
    static new(idMark: string): Either<DomainError, RightsMarkEntity>;
    checkRight(operation: OperationName): Either<DomainError, boolean>;
    setRight(operation: OperationName): Either<DomainError, RightsMarkEntity>;
    setRightDefault(): RightsMarkEntity;
}
