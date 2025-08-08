import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { PaginateDto } from '@core/module/common/domain/dto/paginate.dto';

export class PaginateCredentialDto extends PaginateDto {
  @IsNotEmpty()
  @IsUUID(7, { message: 'O ID do usuário precisa ser um UUID válido' })
  userId: string;

  @IsUUID(7, { message: 'O ID da categoria precisa ser um UUID válido' })
  @IsOptional()
  categoryId?: string;
}
