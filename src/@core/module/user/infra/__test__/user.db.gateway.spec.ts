import { PrismaClient } from '@core/module/common/infra/db/generated/prisma';
import { UserDbGateway } from '@core/module/user/infra/user.db.gateway';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { TUserMock, UserMock } from '@core/module/user/__mock__/user.mock';

describe('UserDbGateway', () => {
  let prismaClient: PrismaClient;
  let gateway: UserDbGateway;

  beforeEach(() => {
    jest.clearAllMocks();

    prismaClient = {
      user: {
        findUnique: jest.fn(),
      },
    } as unknown as PrismaClient;

    gateway = new UserDbGateway(prismaClient);
  });

  describe('get', () => {
    const email = faker.string.uuid();

    beforeEach(() => {
      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue(TUserMock);
    });

    describe('SUCCESS', () => {
      it('should return a user', async () => {
        const user = await gateway.getByEmail(email);

        expect(user).toEqual(UserMock);
        expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
          where: { email },
        });
      });
    });

    describe('FAILURE', () => {
      it('should return null if user not found', async () => {
        jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue(null);

        const user = await gateway.getByEmail(email);

        expect(user).toBeNull();
        expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
          where: { email },
        });
      });
    });
  });
});
