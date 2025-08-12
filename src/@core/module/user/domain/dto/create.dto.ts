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
}

export class CreateUserPasskeyDto extends CreateUserDto {
  @IsString({ message: 'A palavra chave precisa ser um texto' })
  @IsNotEmpty({ message: 'A palavra chave não pode ser vazia' })
  passkey: string;
}
