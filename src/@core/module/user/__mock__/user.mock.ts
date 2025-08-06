import { TUser } from '../domain/user.entity';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const TUserMock: TUser = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  passkey: faker.internet.password(),
};
