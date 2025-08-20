import { IUserGateway } from '@core/module/user/domain/user.gateway';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@core/module/user/domain/dto/create.dto';
import { ConflictException } from '@nestjs/common';

export class CreateUseCase {
  constructor(private readonly gateway: IUserGateway) {}

  async execute(params: CreateUserDto): Promise<void> {
    const existingUser = await this.gateway
      .getByEmail(params.email)
      .catch(() => null);

    if (existingUser) {
      throw new ConflictException('E-mail já utilizado');
    }

    const userPasskey = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(params.password, userPasskey);

    const userWithPassword = {
      ...params,
      password: hashedPassword,
      passkey: userPasskey,
    };

    return this.gateway.create(userWithPassword);
  }
}
