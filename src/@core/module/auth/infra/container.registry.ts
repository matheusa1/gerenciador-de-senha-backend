import 'reflect-metadata';
import { Container } from 'inversify';

import { ValidateUserUseCase } from '../application/validateUser.use.case';
import { LoginUseCase } from '../application/login.use.case';
import { JwtService } from '@nestjs/jwt';
import { constants } from '@core/constants/constants';

const registry = {
  JwtService: Symbol.for('JwtService'),

  ValidateUserUseCase: Symbol.for('ValidateUserUseCase'),
  LoginUseCase: Symbol.for('LoginUseCase'),
};

const container = new Container();

container.bind(registry.JwtService).toConstantValue(
  new JwtService({
    secret: constants.jwtSecret,
    signOptions: { expiresIn: '60s' },
  }),
);

container
  .bind(registry.ValidateUserUseCase)
  .toConstantValue(new ValidateUserUseCase());

container
  .bind(registry.LoginUseCase)
  .toConstantValue(new LoginUseCase(container.get(registry.JwtService)));

export const auth = {
  validateUser: container.get<ValidateUserUseCase>(
    registry.ValidateUserUseCase,
  ),
  login: container.get<LoginUseCase>(registry.LoginUseCase),
};
