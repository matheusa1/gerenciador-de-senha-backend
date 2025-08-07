import { TCredential } from '@core/module/credential/domain/credential.entity';
import { ICredentialGateway } from '@core/module/credential/domain/credential.gateway';

export class RemoveUseCase {
  constructor(private readonly credentialGateway: ICredentialGateway) {}

  async execute(id: string): Promise<TCredential> {
    const credential = await this.credentialGateway.get(id);

    if (!credential) {
      throw new Error('Credencial não encontrada');
    }

    return await this.credentialGateway.remove(id);
  }
}
