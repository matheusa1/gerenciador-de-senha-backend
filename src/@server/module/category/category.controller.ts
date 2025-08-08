import * as Nest from '@nestjs/common';
import type { TCategory } from '@core/module/category/domain/category.entity';
import { category } from '@core/module/category/infra/container.registry';
import type { Request } from 'express';
import { TUser } from '@core/module/user/domain/user.entity';
import { CreateCategoryDto } from '@core/module/category/domain/dto/create.dto';
import { PaginateDto } from '@core/module/common/domain/dto/paginate.dto';
import { TResultPaginate } from '@core/module/common/domain/common.entity';

@Nest.Controller('category')
export class CategoryController {
  @Nest.Post()
  async create(
    @Nest.Body() params: CreateCategoryDto,
    @Nest.Request() req: Request,
  ): Promise<TCategory> {
    if (!req.user) {
      throw new Nest.UnauthorizedException('Usuário não autenticado');
    }

    const user = req.user as TUser;

    return await category.create.execute(params, user.id);
  }

  @Nest.Get(':id')
  async get(@Nest.Param('id') id: string): Promise<TCategory> {
    return await category.get.execute(id);
  }

  @Nest.Patch(':id')
  async update(
    @Nest.Param('id') id: string,
    @Nest.Body() params: CreateCategoryDto,
  ): Promise<TCategory> {
    return await category.update.execute(params, id);
  }

  @Nest.Get()
  async paginate(
    @Nest.Query() params: PaginateDto,
    @Nest.Request() req: Request,
  ): Promise<TResultPaginate<TCategory>> {
    if (!req.user) {
      throw new Nest.UnauthorizedException('Usuário não autenticado');
    }

    const user = req.user as TUser;

    return await category.paginate.execute({ ...params, userId: user.id });
  }

  @Nest.Delete(':id')
  async delete(@Nest.Param('id') id: string): Promise<TCategory> {
    return await category.delete.execute(id);
  }
}
