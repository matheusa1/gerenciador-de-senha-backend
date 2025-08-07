import { ICredentialGateway } from '@core/module/credential/domain/credential.gateway';
import { PrismaClient } from '@prisma/client';
import {
  TCreateCredential,
  TCredential,
} from '@core/module/credential/domain/credential.entity';

export class CredentialDbGateway implements ICredentialGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async create(params: TCreateCredential): Promise<TCredential> {
    return await this.prisma.credential.create({
      data: params,
    });
  }
}
