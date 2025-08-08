import { PaginateDto } from '@core/module/common/domain/dto/paginate.dto';
import { IsUUID } from 'class-validator';

export class PaginateCategoryDto extends PaginateDto {
  @IsUUID(7, { message: 'O id do usuário precisa ser um UUID' })
  userId: string;
}
