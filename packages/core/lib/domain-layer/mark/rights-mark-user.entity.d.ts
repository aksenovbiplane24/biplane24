import { Either } from '@sweet-monads/either';
import { DomainError } from '../common/errors/domain.error';
import { CreatedValueObject } from '../common/value-objects/created.value-object';
import { IdValueObjcet } from '../common/value-objects/id.value-object';
import { OperationName } from './mark.agreegate';
import { RightValueObject } from './value-objects/right.value-object';
export declare class RightsMarkUserEntity {
    readonly id: IdValueObjcet;
    readonly idMark: IdValueObjcet;
    readonly idUser: IdValueObjcet;
    readonly readOnlyRight: RightValueObject;
    readonly writeAndReadRight: RightValueObject;
    readonly created: CreatedValueObject;
    protected constructor(id: IdValueObjcet, idMark: IdValueObjcet, idUser: IdValueObjcet, readOnlyRight: RightValueObject, writeAndReadRight: RightValueObject, created: CreatedValueObject);
    static newForOwn(idMark: IdValueObjcet, idUser: IdValueObjcet): Either<DomainError, RightsMarkUserEntity>;
    static newForUser(idMark: IdValueObjcet, idUser: IdValueObjcet, operation: OperationName): Either<DomainError, RightsMarkUserEntity>;
    setRight(operation: OperationName): Either<DomainError, RightsMarkUserEntity>;
    setRightDefault(): Either<never, RightsMarkUserEntity>;
    demandRight(operation: OperationName): Either<DomainError, boolean>;
}
