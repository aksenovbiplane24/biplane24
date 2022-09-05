import { Either } from "@sweet-monads/either";
import { InfrastructureError } from "../../common/errors/infrastructure.error";
import { IdValueObjcet } from "../../common/value-objects/id.value-object";
import { MarkeAggregate } from "../mark.agreegate";
export interface GettingPort {
    get(id: IdValueObjcet, idUser: IdValueObjcet): Promise<Either<InfrastructureError, MarkeAggregate>>;
}
