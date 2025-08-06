import { user } from '../user.container.registry';

jest.mock('@core/module/common/infra/db/generated/prisma');

describe('User Registry', () => {
  describe('user', () => {
    it('should get GetByEmailUseCase from user', () => {
      const getByEmailUseCase = user.getByEmail;
      expect(getByEmailUseCase).toBeDefined();
    });
  });
});
