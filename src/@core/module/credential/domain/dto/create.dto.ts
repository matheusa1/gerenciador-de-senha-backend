import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCredentialDto {
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;

  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
  username: string;

  @IsUrl(undefined, { message: 'A URL deve ser um endereço válido.' })
  @IsNotEmpty({ message: 'A URL é obrigatória.' })
  url: string;

  @IsString({ message: 'As notas devem ser uma string.' })
  @IsOptional()
  notes?: string;
}
