import { IUserGateway } from '../domain/user.gateway';
import { TUser } from '@core/module/user/domain/user.entity';
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';
import { CreateUserDto } from '@core/module/user/domain/dto/create.dto';

export class UserDbGateway implements IUserGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async getByEmail(email: string): Promise<TUser | null> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(params: CreateUserDto): Promise<Omit<TUser, 'password'>> {
    return await this.prisma.user.create({
      data: {
        email: params.email,
        password: params.password,
        name: params.name,
        passkey: params.passkey,
      },
      omit: {
        password: true,
      },
    });
  }
}
