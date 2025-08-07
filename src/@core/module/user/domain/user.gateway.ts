import { TUser } from './user.entity';
import { CreateUserDto } from '@core/module/user/domain/dto/create.dto';

export interface IUserGateway {
  getByEmail(email: string): Promise<TUser | null>;

  create(params: CreateUserDto): Promise<Omit<TUser, 'password'>>;
}
