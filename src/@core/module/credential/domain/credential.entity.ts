export type TCredential = {
  id: string;
  userId: string;
  name: string;
  password: string | null;
  username: string | null;
  url: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};
