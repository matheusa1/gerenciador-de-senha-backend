import { TUser } from '@core/module/user/domain/user.entity';

export type TValidateUser = {
  email: string;
  password: string;
};

export type TAuthPayload = Omit<TUser, 'password' | 'id'> & {
  sub: string;
  iat?: number;
  exp?: number;
};

export type TLoginResponse = {
  access_token: string;
};
