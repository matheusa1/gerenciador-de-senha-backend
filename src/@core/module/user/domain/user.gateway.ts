import { TUser } from './user.entity';
import { CreateUserPasskeyDto } from '@core/module/user/domain/dto/create.dto';

export interface IUserGateway {
  getByEmail(email: string): Promise<TUser | null>;

  create(params: CreateUserPasskeyDto): Promise<Omit<TUser, 'password'>>;
}
