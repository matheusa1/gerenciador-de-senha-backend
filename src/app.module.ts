import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './@server/module/auth/auth.module';
import { UserModule } from './@server/module/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './@server/module/auth/guard/jwt-auth.guard';
import { CredentialModule } from './@server/module/credential/credential.module';

@Module({
  imports: [AuthModule, UserModule, CredentialModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
