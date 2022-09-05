import { Injectable } from '@nestjs/common';
import { AuthenticatingService, AuthorizatingService, CreatingMarkService, GettingMarkService } from 'core';
import { AuthenticatingDto, CreatingMarkDto } from './app.controller';

@Injectable()
export class AppService {
  constructor(
    private readonly _authenticatingService: AuthenticatingService,
    private readonly _authorizatingService: AuthorizatingService,
    private readonly _creatingMarkService: CreatingMarkService,
    private readonly _gettingMarkService: GettingMarkService
  ) {}

  authenticate(dto: AuthenticatingDto) {
    return this._authenticatingService.auth(dto.email, dto.password) 
  }

  authorizate(token: string) {
    return this._authorizatingService.auth(token)
  }
  

  createMark(dto: CreatingMarkDto, token: string) {
    return this._creatingMarkService.create(dto, token)
  }

  getMark(id: string, token: string) {
    return this._gettingMarkService.get(id, token)
  }
}
