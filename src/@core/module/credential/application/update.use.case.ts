import { UpdateCredentialDto } from '@core/module/credential/domain/dto/update.dto';
import { ICredentialGateway } from '@core/module/credential/domain/credential.gateway';
import { TCredential } from '@core/module/credential/domain/credential.entity';
import { NotFoundException } from '@nestjs/common';

export class UpdateUseCase {
  constructor(private readonly gateway: ICredentialGateway) {}

  async execute(params: UpdateCredentialDto, id: string): Promise<TCredential> {
    const credential = await this.gateway.get(id);

    if (!credential) {
      throw new NotFoundException(`Credencial com ID ${id} não encontrada.`);
    }

    return this.gateway.update(params, id);
  }
}
