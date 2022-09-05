import { Either } from "@sweet-monads/either";
import { UserAggregate } from "../user.aggregate";
import { IdValueObjcet } from "../../common/value-objects/id.value-object";
import { InfrastructureError } from "../../common/errors/infrastructure.error";

export interface GettingPort {
  get(id: IdValueObjcet): Promise<Either<InfrastructureError, UserAggregate>>
}