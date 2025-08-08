import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './@server/module/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './@server/module/auth/guard/jwt-auth.guard';
import { CredentialModule } from './@server/module/credential/credential.module';
import { CategoryModule } from './@server/module/category/category.module';

@Module({
  imports: [AuthModule, CredentialModule, CategoryModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
