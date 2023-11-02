import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TelegramAuthenticationService } from './services/telegram-authentication.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [AuthController],
  providers: [UserService, TelegramAuthenticationService],
})
export class AuthModule {}
