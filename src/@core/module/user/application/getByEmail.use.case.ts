import { IUserGateway } from '../domain/user.gateway';
import { TUser } from '../domain/user.entity';
import { NotFoundException } from '@nestjs/common';

export class GetByEmailUseCase {
  constructor(private readonly gateway: IUserGateway) {}

  async execute(email: string): Promise<TUser> {
    const user = await this.gateway.getByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
