
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserAggregate } from 'core';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((el) => {
        if (el instanceof UserAggregate) {
          return {
            id: el.id.value,
            email: el.email.value,
          }
        } else {
          return el
        }
      }),
    )
  }
}