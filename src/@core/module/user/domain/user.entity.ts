export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  passkey: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TCreateUser = Omit<TUser, 'id' | 'createdAt' | 'updatedAt'>;
