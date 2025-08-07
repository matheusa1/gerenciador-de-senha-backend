import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PaginateDto {
  @Type(() => Number)
  @IsNotEmpty({ message: 'A página é obrigatória' })
  @IsInt({ message: 'A página deve ser um número inteiro' })
  page: number;

  @Type(() => Number)
  @IsNotEmpty({ message: 'O limite é obrigatório' })
  @IsInt({ message: 'O limite deve ser um número inteiro' })
  limit: number;
}
