import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail(undefined, {
    message: 'Email inválido',
  })
  @IsNotEmpty({
    message: 'Email é obrigatório',
  })
  email: string;
  @IsNotEmpty({
    message: 'Senha é obrigatória',
  })
  @IsString({
    message: 'Senha deve ser um texto',
  })
  @MinLength(6, {
    message: 'Senha deve ter no mínimo 6 caracteres',
  })
  password: string;
}
