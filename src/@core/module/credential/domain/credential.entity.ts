import { TUser } from '@core/module/user/domain/user.entity';

export type TCredential = {
  id: string;
  userId: string;
  password: string;
  username: string;
  url: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;

  user?: TUser;
};

export type TCreateCredential = Omit<
  TCredential,
  'id' | 'createdAt' | 'updatedAt' | 'user'
>;
