import { IUserGateway } from '@core/module/user/domain/user.gateway';
import { TCreateUser, TUser } from '@core/module/user/domain/user.entity';

import * as bcrypt from 'bcrypt';

export class CreateUseCase {
  constructor(private readonly gateway: IUserGateway) {}

  async execute(params: TCreateUser): Promise<Omit<TUser, 'password'>> {
    const hashedPassword = await bcrypt.hash(params.password, 10);

    const userWithPassword = {
      ...params,
      password: hashedPassword,
    };

    return this.gateway.create(userWithPassword);
  }
}
