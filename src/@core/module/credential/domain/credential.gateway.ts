import { TCredential } from '@core/module/credential/domain/credential.entity';
import { CreateCredentialDto } from '@core/module/credential/domain/dto/create.dto';
import { UpdateCredentialDto } from '@core/module/credential/domain/dto/update.dto';
import { TResultPaginate } from '@core/module/common/domain/common.entity';
import { PaginateCredentialDto } from '@core/module/credential/domain/dto/paginate.dto';

export interface ICredentialGateway {
  create(params: CreateCredentialDto, userId: string): Promise<TCredential>;

  get(id: string): Promise<TCredential | null>;

  update(params: UpdateCredentialDto, id: string): Promise<TCredential>;

  paginate(
    params: PaginateCredentialDto,
  ): Promise<TResultPaginate<TCredential>>;

  remove(id: string): Promise<TCredential>;
}
