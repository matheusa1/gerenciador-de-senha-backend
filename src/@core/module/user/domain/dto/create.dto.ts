import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome precisa ser um texto' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  email: string;

  @IsString({ message: 'Senha precisa ser um texto' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  password: string;

  @IsString({ message: 'Passkey precisa ser um texto' })
  @IsNotEmpty({ message: 'Passkey não pode ser vazia' })
  passkey: string;
}
