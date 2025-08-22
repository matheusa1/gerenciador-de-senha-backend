import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateCredentialDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsOptional()
  password?: string;

  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsOptional()
  username?: string;

  @IsUrl(undefined, { message: 'A URL deve ser um endereço válido.' })
  @IsOptional()
  url?: string;

  @IsString({ message: 'As notas devem ser uma string.' })
  @IsOptional()
  notes?: string;

  @IsUUID(7, { message: 'O ID da categoria deve ser um UUID válido.' })
  @IsOptional()
  categoryId?: string;
}
