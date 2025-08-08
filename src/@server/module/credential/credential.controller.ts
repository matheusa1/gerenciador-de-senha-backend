import * as Nest from '@nestjs/common';
import type { TCredential } from '@core/module/credential/domain/credential.entity';
import { credential } from '@core/module/credential/infra/container.registry';
import type { Request } from 'express';
import { TUser } from '@core/module/user/domain/user.entity';
import { CreateCredentialDto } from '@core/module/credential/domain/dto/create.dto';
import { PaginateDto } from '@core/module/common/domain/dto/paginate.dto';
import { TResultPaginate } from '@core/module/common/domain/common.entity';

@Nest.Controller('credential')
export class CredentialController {
  @Nest.Post()
  async create(
    @Nest.Body() params: CreateCredentialDto,
    @Nest.Request() req: Request,
  ): Promise<TCredential> {
    if (!req.user) {
      throw new Nest.UnauthorizedException('Usuário não autenticado');
    }

    const user = req.user as TUser;

    return await credential.create.execute(params, user.id);
  }

  @Nest.Get(':id')
  async get(@Nest.Param('id') id: string): Promise<TCredential> {
    return await credential.get.execute(id);
  }

  @Nest.Patch(':id')
  async update(
    @Nest.Param('id') id: string,
    @Nest.Body() params: CreateCredentialDto,
  ): Promise<TCredential> {
    return await credential.update.execute(params, id);
  }

  @Nest.Get()
  async paginate(
    @Nest.Query() params: PaginateDto,
    @Nest.Request() req: Request,
  ): Promise<TResultPaginate<TCredential>> {
    if (!req.user) {
      throw new Nest.UnauthorizedException('Usuário não autenticado');
    }

    const user = req.user as TUser;

    return await credential.paginate.execute({ ...params, userId: user.id });
  }

  @Nest.Delete(':id')
  async delete(@Nest.Param('id') id: string): Promise<TCredential> {
    return await credential.delete.execute(id);
  }
}
