import { TCreateUser, TUser } from './user.entity';

export interface IUserGateway {
  getByEmail(email: string): Promise<TUser | null>;

  create(params: TCreateUser): Promise<TUser>;
}
