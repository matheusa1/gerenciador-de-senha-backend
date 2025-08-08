import { TCategory } from '@core/module/category/domain/category.entity';
import { ICategoryGateway } from '@core/module/category/domain/category.gateway';

export class RemoveUseCase {
  constructor(private readonly categoryGateway: ICategoryGateway) {}

  async execute(id: string): Promise<TCategory> {
    const category = await this.categoryGateway.get(id);

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    return await this.categoryGateway.remove(id);
  }
}
