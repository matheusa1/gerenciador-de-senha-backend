import { IUserGateway } from '@core/module/user/domain/user.gateway';
import { TCreateUser, TUser } from '@core/module/user/domain/user.entity';

export class CreateUseCase {
  constructor(private readonly gateway: IUserGateway) {}

  execute(params: TCreateUser): Promise<TUser> {
    return this.gateway.create(params);
  }
}
