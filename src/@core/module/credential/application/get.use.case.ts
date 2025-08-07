import { TCredential } from '@core/module/credential/domain/credential.entity';
import { ICredentialGateway } from '@core/module/credential/domain/credential.gateway';
import { NotFoundException } from '@nestjs/common';

export class GetUseCase {
  constructor(private readonly gateway: ICredentialGateway) {}

  async execute(id: string): Promise<TCredential> {
    const credential = await this.gateway.get(id);

    if (!credential) {
      throw new NotFoundException(`Credencial com ID ${id} não encontrada.`);
    }

    return credential;
  }
}
