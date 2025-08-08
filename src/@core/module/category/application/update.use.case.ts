import { UpdateCategoryDto } from '@core/module/category/domain/dto/update.dto';
import { ICategoryGateway } from '@core/module/category/domain/category.gateway';
import { TCategory } from '@core/module/category/domain/category.entity';
import { NotFoundException } from '@nestjs/common';

export class UpdateUseCase {
  constructor(private readonly gateway: ICategoryGateway) {}

  async execute(params: UpdateCategoryDto, id: string): Promise<TCategory> {
    const category = await this.gateway.get(id);

    if (!category) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada.`);
    }

    return this.gateway.update(params, id);
  }
}
