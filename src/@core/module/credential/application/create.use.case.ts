import { ICredentialGateway } from '@core/module/credential/domain/credential.gateway';
import {
  TCreateCredential,
  TCredential,
} from '@core/module/credential/domain/credential.entity';

export class CreateUseCase {
  constructor(private readonly gateway: ICredentialGateway) {}

  execute(params: TCreateCredential): Promise<TCredential> {
    return this.gateway.create(params);
  }
}
