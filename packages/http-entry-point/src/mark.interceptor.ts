import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { MarkeAggregate } from 'core';
import { map, Observable } from 'rxjs';

@Injectable()
export class MarkInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((el) => {
        if (el instanceof MarkeAggregate) {
          return {
            id: el.id.value,
            name: el.name.value,
            created: el.created.value,
            formula: el.formula.value,
            type: el.type.value
          }
        } else {
          return el
        }
      }),
    )
  }
}
