import { Either } from "@sweet-monads/either";
import { UserAggregate } from "../user.aggregate";
import { InfrastructureError } from "../../common/errors/infrastructure.error";
import { EmailValueObject } from "../value-objects/email.value-object";
export interface GettingByEmailPort {
    get(email: EmailValueObject): Promise<Either<InfrastructureError, UserAggregate>>;
}
