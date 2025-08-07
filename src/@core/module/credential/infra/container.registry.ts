import { CredentialDbGateway } from './credential.db.gateway';
import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';
import { CreateUseCase } from '../application/create.use.case';

const registry = {
  PrismaClient: Symbol.for('PrismaClient'),
  CredentialDbGateway: Symbol.for('CredentialDbGateway'),

  CreateUseCase: Symbol.for('CreateUseCase'),
};

const container = new Container();

container
  .bind<PrismaClient>(registry.PrismaClient)
  .toConstantValue(new PrismaClient());
container
  .bind<CredentialDbGateway>(registry.CredentialDbGateway)
  .toDynamicValue(
    (context) => new CredentialDbGateway(context.get(registry.PrismaClient)),
  );

container.bind(registry.CreateUseCase).toDynamicValue((context) => {
  return new CreateUseCase(context.get(registry.CredentialDbGateway));
});

export const credential = {
  create: container.get<CreateUseCase>(registry.CreateUseCase),
};
