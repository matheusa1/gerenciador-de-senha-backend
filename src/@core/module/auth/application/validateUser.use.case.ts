import { TValidateUser } from '@core/module/auth/domain/auth.entity';
import { user } from '@core/module/user/infra/user.container.registry';
import { TUser } from '@core/module/user/domain/user.entity';

export class ValidateUserUseCase {
  async execute(
    params: TValidateUser,
  ): Promise<Omit<TUser, 'password'> | null> {
    const userFound = await user.getByEmail.execute(params.email);

    // if (userFound.password === params.password) {
    return userFound;
    // }
    //
    // return null;
  }
}
