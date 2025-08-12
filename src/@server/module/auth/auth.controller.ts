import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Request as NestRequest,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { auth } from '@core/module/auth/infra/container.registry';
import type { Request } from 'express';
import type { TUser } from '@core/module/user/domain/user.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { user } from '@core/module/user/infra/user.container.registry';
import type { TLoginResponse } from '@core/module/auth/domain/auth.entity';
import { IsPublic } from '@core/decorators/public.decorator';
import { CreateUserDto } from '@core/module/user/domain/dto/create.dto';

@Controller('auth')
export class AuthController {
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@NestRequest() req: Request): TLoginResponse {
    if (!req.user) {
      throw new InternalServerErrorException(
        'Usuário não encontrado na requisição',
      );
    }
    return auth.login.execute(req.user as TUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@NestRequest() req: Request) {
    return { ...req.user, password: undefined };
  }

  @IsPublic()
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return await user.create.execute(body);
  }
}
