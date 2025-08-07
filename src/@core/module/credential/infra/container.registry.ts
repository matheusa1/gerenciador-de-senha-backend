import { CredentialDbGateway } from './credential.db.gateway';
import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';
import { CreateUseCase } from '../application/create.use.case';
import { GetUseCase } from '../application/get.use.case';
import { UpdateUseCase } from '../application/update.use.case';
import { PaginateUseCase } from '../application/paginate.use.case';
import { RemoveUseCase } from '../application/remove.use.case';

const registry = {
  PrismaClient: Symbol.for('PrismaClient'),
  CredentialDbGateway: Symbol.for('CredentialDbGateway'),

  CreateUseCase: Symbol.for('CreateUseCase'),
  GetUseCase: Symbol.for('GetUseCase'),
  UpdateUseCase: Symbol.for('UpdateUseCase'),
  PaginateUseCase: Symbol.for('PaginateUseCase'),
  RemoveUseCase: Symbol.for('RemoveUseCase'),
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
container.bind(registry.GetUseCase).toDynamicValue((context) => {
  return new GetUseCase(context.get(registry.CredentialDbGateway));
});
container.bind(registry.UpdateUseCase).toDynamicValue((context) => {
  return new UpdateUseCase(context.get(registry.CredentialDbGateway));
});
container.bind(registry.PaginateUseCase).toDynamicValue((context) => {
  return new PaginateUseCase(context.get(registry.CredentialDbGateway));
});
container.bind(registry.RemoveUseCase).toDynamicValue((context) => {
  return new RemoveUseCase(context.get(registry.CredentialDbGateway));
});

export const credential = {
  create: container.get<CreateUseCase>(registry.CreateUseCase),
  get: container.get<GetUseCase>(registry.GetUseCase),
  update: container.get<UpdateUseCase>(registry.UpdateUseCase),
  paginate: container.get<PaginateUseCase>(registry.PaginateUseCase),
  delete: container.get<RemoveUseCase>(registry.RemoveUseCase),
};
