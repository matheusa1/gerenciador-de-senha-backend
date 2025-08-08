import { TCategory } from '@core/module/category/domain/category.entity';
import { CreateCategoryDto } from '@core/module/category/domain/dto/create.dto';
import { UpdateCategoryDto } from '@core/module/category/domain/dto/update.dto';
import { TResultPaginate } from '@core/module/common/domain/common.entity';
import { PaginateCategoryDto } from '@core/module/category/domain/dto/paginate.dto';

export interface ICategoryGateway {
  create(params: CreateCategoryDto, userId: string): Promise<TCategory>;

  get(id: string): Promise<TCategory | null>;

  update(params: UpdateCategoryDto, id: string): Promise<TCategory>;

  paginate(params: PaginateCategoryDto): Promise<TResultPaginate<TCategory>>;

  remove(id: string): Promise<TCategory>;
}
