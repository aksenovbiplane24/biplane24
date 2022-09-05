import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticatingService, AuthorizatingService, CreatingMarkService, GettingMarkService, MarkeAggregate, UserAggregate } from 'core';
import { GettingMarkAdapter, CreatingMarkAdapter } from 'test-mark-adapters';
import { GettingUserAdapter, GettingUserByemailAdapter } from 'test-user-adapters';
import { TokenGuard } from './token.guard';

const userStore: UserAggregate[] = []
const markeStore: MarkeAggregate[] = []

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: AuthenticatingService,
      useFactory: () => {
        return new AuthenticatingService(new GettingUserByemailAdapter(userStore))
      }
    },
    {
      provide: AuthorizatingService,
      useFactory: () => {
        return new AuthorizatingService(new GettingUserAdapter(userStore))
      }
    },
    {
      provide: CreatingMarkService,
      useFactory: () => {
        return new CreatingMarkService(
          new AuthorizatingService(new GettingUserAdapter(userStore)),
          new CreatingMarkAdapter(markeStore),
        )
      }
    },
    {
      provide: GettingMarkService,
      useFactory: () => {
        return new GettingMarkService(
          new AuthorizatingService(new GettingUserAdapter(userStore)),
          new GettingMarkAdapter(markeStore)
        )
      }
    },
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
    AppService
  ],
})
export class AppModule {}
