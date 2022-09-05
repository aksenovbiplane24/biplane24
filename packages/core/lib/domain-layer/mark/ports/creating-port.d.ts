import { Either } from "@sweet-monads/either";
import { InfrastructureError } from "../../common/errors/infrastructure.error";
import { MarkeAggregate } from "../mark.agreegate";
export interface CreatingPort {
    create(mark: MarkeAggregate): Promise<Either<InfrastructureError, boolean>>;
}
