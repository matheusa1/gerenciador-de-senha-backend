import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { IsPublic } from '@core/decorators/public.decorator';

@Controller()
export class AppController {
  @IsPublic()
  @Get('health')
  @HttpCode(HttpStatus.OK)
  getHealth() {
    return;
  }
}
