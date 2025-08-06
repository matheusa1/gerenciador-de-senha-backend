import { TUser } from '@core/module/user/domain/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
  TAuthPayload,
  TLoginResponse,
} from '@core/module/auth/domain/auth.entity';

export class LoginUseCase {
  constructor(private readonly jwt: JwtService) {}

  execute(user: TUser): TLoginResponse {
    const payload: TAuthPayload = { sub: user.id, ...user };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
