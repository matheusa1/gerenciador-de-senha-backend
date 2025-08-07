import { IsNotEmpty, IsUUID } from 'class-validator';
import { PaginateDto } from '@core/module/common/domain/dto/paginate.dto';

export class PaginateCredentialDto extends PaginateDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
