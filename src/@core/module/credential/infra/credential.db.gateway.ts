import { ICredentialGateway } from '@core/module/credential/domain/credential.gateway';
import { PrismaClient } from '@prisma/client';
import { TCredential } from '@core/module/credential/domain/credential.entity';
import { CreateCredentialDto } from '@core/module/credential/domain/dto/create.dto';
import { UpdateCredentialDto } from '@core/module/credential/domain/dto/update.dto';
import { TResultPaginate } from '@core/module/common/domain/common.entity';
import { PaginateCredentialDto } from '@core/module/credential/domain/dto/paginate.dto';

export class CredentialDbGateway implements ICredentialGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    params: CreateCredentialDto,
    userId: string,
  ): Promise<TCredential> {
    return await this.prisma.credential.create({
      data: {
        ...params,
        userId,
      },
    });
  }

  update(params: UpdateCredentialDto, id: string): Promise<TCredential> {
    return this.prisma.credential.update({
      where: { id },
      data: params,
    });
  }

  get(id: string): Promise<TCredential | null> {
    return this.prisma.credential.findUnique({
      where: { id },
    });
  }

  async paginate(
    params: PaginateCredentialDto,
  ): Promise<TResultPaginate<TCredential>> {
    const { page, limit, userId, categoryId } = params;

    const data = await this.prisma.credential.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: {
        userId,
        categoryId,
      },
    });

    const total = await this.prisma.credential.count({
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

  remove(id: string): Promise<TCredential> {
    return this.prisma.credential.delete({
      where: { id },
    });
  }
}
