import { ICategoryGateway } from '@core/module/category/domain/category.gateway';
import { TCategory } from '@core/module/category/domain/category.entity';
import { CreateCategoryDto } from '@core/module/category/domain/dto/create.dto';

export class CreateUseCase {
  constructor(private readonly gateway: ICategoryGateway) {}

  execute(params: CreateCategoryDto, userId: string): Promise<TCategory> {
    return this.gateway.create(params, userId);
  }
}
