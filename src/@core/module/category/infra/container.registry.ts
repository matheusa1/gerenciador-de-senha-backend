import { CategoryDbGateway } from './category.db.gateway';
import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';
import { CreateUseCase } from '../application/create.use.case';
import { GetUseCase } from '../application/get.use.case';
import { UpdateUseCase } from '../application/update.use.case';
import { PaginateUseCase } from '../application/paginate.use.case';
import { RemoveUseCase } from '../application/remove.use.case';

const registry = {
  PrismaClient: Symbol.for('PrismaClient'),
  CategoryDbGateway: Symbol.for('CategoryDbGateway'),

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
  .bind<CategoryDbGateway>(registry.CategoryDbGateway)
  .toDynamicValue(
    (context) => new CategoryDbGateway(context.get(registry.PrismaClient)),
  );

container.bind(registry.CreateUseCase).toDynamicValue((context) => {
  return new CreateUseCase(context.get(registry.CategoryDbGateway));
});
container.bind(registry.GetUseCase).toDynamicValue((context) => {
  return new GetUseCase(context.get(registry.CategoryDbGateway));
});
container.bind(registry.UpdateUseCase).toDynamicValue((context) => {
  return new UpdateUseCase(context.get(registry.CategoryDbGateway));
});
container.bind(registry.PaginateUseCase).toDynamicValue((context) => {
  return new PaginateUseCase(context.get(registry.CategoryDbGateway));
});
container.bind(registry.RemoveUseCase).toDynamicValue((context) => {
  return new RemoveUseCase(context.get(registry.CategoryDbGateway));
});

export const category = {
  create: container.get<CreateUseCase>(registry.CreateUseCase),
  get: container.get<GetUseCase>(registry.GetUseCase),
  update: container.get<UpdateUseCase>(registry.UpdateUseCase),
  paginate: container.get<PaginateUseCase>(registry.PaginateUseCase),
  delete: container.get<RemoveUseCase>(registry.RemoveUseCase),
};
