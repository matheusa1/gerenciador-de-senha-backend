import { ICategoryGateway } from '@core/module/category/domain/category.gateway';
import { TResultPaginate } from '@core/module/common/domain/common.entity';
import { TCategory } from '@core/module/category/domain/category.entity';
import { PaginateCategoryDto } from '@core/module/category/domain/dto/paginate.dto';

export class PaginateUseCase {
  constructor(private readonly gateway: ICategoryGateway) {}

  async execute(
    params: PaginateCategoryDto,
  ): Promise<TResultPaginate<TCategory>> {
    return this.gateway.paginate(params);
  }
}
