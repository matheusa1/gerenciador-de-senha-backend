import { ICredentialGateway } from '@core/module/credential/domain/credential.gateway';
import { TCredential } from '@core/module/credential/domain/credential.entity';
import { CreateCredentialDto } from '@core/module/credential/domain/dto/create.dto';

export class CreateUseCase {
  constructor(private readonly gateway: ICredentialGateway) {}

  execute(params: CreateCredentialDto, userId: string): Promise<TCredential> {
    return this.gateway.create(params, userId);
  }
}
