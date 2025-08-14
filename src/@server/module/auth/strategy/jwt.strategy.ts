import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { constants } from '@core/constants/constants';
import { TAuthPayload } from '@core/module/auth/domain/auth.entity';
import { TUser } from '@core/module/user/domain/user.entity';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.jwtSecret,
    });
  }

  validate(payload: TAuthPayload): Omit<TUser, 'password'> {
    delete payload.iat;
    delete payload.exp;

    return {
      ...payload,
      id: payload.sub,
    };
  }
}
