import { IUserGateway } from '@core/module/user/domain/user.gateway';
import { TUser } from '@core/module/user/domain/user.entity';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@core/module/user/domain/dto/create.dto';
import { ConflictException } from '@nestjs/common';

export class CreateUseCase {
  constructor(private readonly gateway: IUserGateway) {}

  async execute(params: CreateUserDto): Promise<Omit<TUser, 'password'>> {
    const existingUser = await this.gateway
      .getByEmail(params.email)
      .catch(() => null);

    if (existingUser) {
      throw new ConflictException('E-mail já utilizado');
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    const userWithPassword = {
      ...params,
      password: hashedPassword,
    };

    return this.gateway.create(userWithPassword);
  }
}
