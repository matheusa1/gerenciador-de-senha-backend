import { IUserGateway } from '../../domain/user.gateway';
import { GetByEmailUseCase } from '../getByEmail.use.case';
import { TUserMock } from '../../__mock__/user.mock';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('GetByEmailUseCase', () => {
  let gateway: IUserGateway;
  let useCase: GetByEmailUseCase;

  const email: string = faker.internet.email();

  beforeEach(() => {
    jest.clearAllMocks();

    gateway = {
      getByEmail: jest.fn(),
    } as unknown as IUserGateway;

    useCase = new GetByEmailUseCase(gateway);

    jest.spyOn(gateway, 'getByEmail').mockResolvedValue(TUserMock);
  });

  describe('SUCCESS', () => {
    it('should return a user', async () => {
      const result = await useCase.execute(email);

      expect(gateway.getByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(TUserMock);
    });
  });

  describe('FAILURE', () => {
    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(gateway, 'getByEmail').mockResolvedValue(null);

      await expect(useCase.execute(email)).rejects.toThrow(
        'Usuário não encontrado',
      );
      expect(gateway.getByEmail).toHaveBeenCalledWith(email);
    });
  });
});
