import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TelegramGuard } from './auth/guards/telegram.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { TelegramAuthenticationService } from './auth/services/telegram-authentication.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    TelegramAuthenticationService,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    TelegramGuard,
  ],
})
export class AppModule {}
