import { ICategoryGateway } from '@core/module/category/domain/category.gateway';
import { PrismaClient } from '@prisma/client';
import { TCategory } from '@core/module/category/domain/category.entity';
import { CreateCategoryDto } from '@core/module/category/domain/dto/create.dto';
import { UpdateCategoryDto } from '@core/module/category/domain/dto/update.dto';
import { TResultPaginate } from '@core/module/common/domain/common.entity';
import { PaginateCategoryDto } from '@core/module/category/domain/dto/paginate.dto';

export class CategoryDbGateway implements ICategoryGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async create(params: CreateCategoryDto, userId: string): Promise<TCategory> {
    return await this.prisma.category.create({
      data: {
        ...params,
        userId,
      },
    });
  }

  update(params: UpdateCategoryDto, id: string): Promise<TCategory> {
    return this.prisma.category.update({
      where: { id },
      data: params,
    });
  }

  get(id: string): Promise<TCategory | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async paginate(
    params: PaginateCategoryDto,
  ): Promise<TResultPaginate<TCategory>> {
    const { page, limit, userId } = params;

    const data = await this.prisma.category.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: {
        userId,
      },
    });

    const total = await this.prisma.category.count({
      where: {
        userId,
      },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  remove(id: string): Promise<TCategory> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
