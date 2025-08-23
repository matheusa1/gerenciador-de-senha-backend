import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCredentialDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsOptional()
  password?: string;

  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsOptional()
  username?: string;

  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsUrl(undefined, { message: 'A URL deve ser um endereço válido.' })
  @IsOptional()
  url?: string;

  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString({ message: 'As notas devem ser uma string.' })
  @IsOptional()
  notes?: string;

  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsUUID(7, { message: 'O ID da categoria deve ser um UUID válido.' })
  @IsOptional()
  categoryId?: string;
}
