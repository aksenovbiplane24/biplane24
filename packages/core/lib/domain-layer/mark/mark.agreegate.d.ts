import { Either } from '@sweet-monads/either';
import { DomainError } from '../common/errors/domain.error';
import { CreatedValueObject } from '../common/value-objects/created.value-object';
import { IdValueObjcet } from '../common/value-objects/id.value-object';
import { NameValueObject } from '../common/value-objects/name.value-object';
import { CreatingDto } from './dtos/creating.dto';
import { RightsMarkEntity } from './rights-mark.entity';
import { RightsMarkUserEntity } from './rights-mark-user.entity';
import { FormaulaValueObject } from './value-objects/formula.value-object';
import { TypeValueObject } from './value-objects/type.value-object';
export declare type OperationName = 'READ' | 'WRITE_AND_READ';
export declare class MarkeAggregate {
    readonly id: IdValueObjcet;
    readonly name: NameValueObject;
    readonly formula: FormaulaValueObject;
    readonly type: TypeValueObject;
    readonly globalRight: RightsMarkEntity;
    readonly userRights: RightsMarkUserEntity[];
    readonly created: CreatedValueObject;
    protected constructor(id: IdValueObjcet, name: NameValueObject, formula: FormaulaValueObject, type: TypeValueObject, globalRight: RightsMarkEntity, userRights: RightsMarkUserEntity[], created: CreatedValueObject);
    static new(dto: CreatingDto): Either<DomainError, MarkeAggregate>;
    addRightForUser(userId: IdValueObjcet, operation: OperationName): Either<DomainError, MarkeAggregate>;
    demandRight(userId: IdValueObjcet, operation: OperationName): Either<DomainError, boolean>;
}
