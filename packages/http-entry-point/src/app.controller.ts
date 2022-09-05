import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { UserInterceptor } from './user.interceptor';
import { MarkInterceptor } from './mark.interceptor';

export type AuthenticatingDto = {
  email: string
  password: string
}

export type CreatingMarkDto = {
  name: string
  formula: string
  type: string
}

type Request = {
  cookies: string
  id: string
}

@Controller()
export class AppController {
  constructor(
    private readonly _appService: AppService,
  ) {}

  @Post('authenticate')
  async create(@Body() dto: AuthenticatingDto,  @Res() res: Response) {
    const maybeToken = await this._appService.authenticate(dto)
    if (maybeToken.isLeft()) {
      res.status(HttpStatus.BAD_REQUEST).json(maybeToken.value)
    } else {
      res.cookie('token', maybeToken.value.token.value)
      res.cookie('refresh-token', maybeToken.value.refreshToken.value)
      res.status(HttpStatus.OK).json(true)
    }
  }

  @UseInterceptors(UserInterceptor)
  @Get('authorizate')
  async auth(@Res({ passthrough: true }) res: Response, @Req() request: Request) {
    const result = await this._appService.authorizate(request.cookies['token'])
    if (result.isLeft()) {
      res.status(HttpStatus.UNAUTHORIZED).json(result.value)
    } else {
      res.status(HttpStatus.OK).json(result.value)
    }
  }

  @Post('create-mark')
  async createMark(@Body() dto: CreatingMarkDto,  @Res() res: Response, @Req() request: Request) {
    const result = await this._appService.createMark(dto, request.cookies['token'])
    if (result.isLeft()) {
      res.status(HttpStatus.BAD_REQUEST).json(result.value)
    } else {
      res.status(HttpStatus.OK).json(result.value)
    }
  }

  @UseInterceptors(MarkInterceptor)
  @Get()
  async getAMark(@Res({ passthrough: true }) res: Response, @Req() request: Request) {
    const result = await this._appService.getMark(request.id, request.cookies['token'])
    if (result.isLeft()) {
      res.status(HttpStatus.BAD_REQUEST).json(result.value)
    } else {
      res.status(HttpStatus.OK).json(result.value)
    }
  }
}
