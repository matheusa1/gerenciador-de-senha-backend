import { TCategory } from '@core/module/category/domain/category.entity';
import { ICategoryGateway } from '@core/module/category/domain/category.gateway';
import { NotFoundException } from '@nestjs/common';

export class GetUseCase {
  constructor(private readonly gateway: ICategoryGateway) {}

  async execute(id: string): Promise<TCategory> {
    const category = await this.gateway.get(id);

    if (!category) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada.`);
    }

    return category;
  }
}
