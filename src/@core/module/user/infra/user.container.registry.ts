import 'reflect-metadata';
import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';

import { UserDbGateway } from '@core/module/user/infra/user.db.gateway';

import { GetByEmailUseCase } from '@core/module/user/application/getByEmail.use.case';
import { CreateUseCase } from '@core/module/user/application/create.use.case';

export const registry = {
  PrismaClient: Symbol.for('PrismaClient'),

  UserDbGateway: Symbol.for('UserDbGateway'),

  GetByEmailUseCase: Symbol.for('GetByEmailUseCase'),
  CreateUseCase: Symbol.for('CreateUseCase'),
};

export const container = new Container();

container.bind(registry.PrismaClient).toConstantValue(new PrismaClient());
container
  .bind(registry.UserDbGateway)
  .toDynamicValue(
    (context) => new UserDbGateway(context.get(registry.PrismaClient)),
  );

container
  .bind(registry.GetByEmailUseCase)
  .toDynamicValue(
    (context) => new GetByEmailUseCase(context.get(registry.UserDbGateway)),
  );

container
  .bind(registry.CreateUseCase)
  .toDynamicValue(
    (context) => new CreateUseCase(context.get(registry.UserDbGateway)),
  );

export const user = {
  getByEmail: container.get<GetByEmailUseCase>(registry.GetByEmailUseCase),
  create: container.get<CreateUseCase>(registry.CreateUseCase),
};
