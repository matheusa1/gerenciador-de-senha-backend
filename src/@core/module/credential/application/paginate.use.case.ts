import { ICredentialGateway } from '@core/module/credential/domain/credential.gateway';
import { TResultPaginate } from '@core/module/common/domain/common.entity';
import { TCredential } from '@core/module/credential/domain/credential.entity';
import { PaginateCredentialDto } from '@core/module/credential/domain/dto/paginate.dto';

export class PaginateUseCase {
  constructor(private readonly gateway: ICredentialGateway) {}

  async execute(
    params: PaginateCredentialDto,
  ): Promise<TResultPaginate<TCredential>> {
    return this.gateway.paginate(params);
  }
}
