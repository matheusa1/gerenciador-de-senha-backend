import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { auth } from '@core/module/auth/infra/container.registry';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const userData = await auth.validateUser.execute({
      email,
      password,
    });

    if (!userData) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    return userData;
  }
}
