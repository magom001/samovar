import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TelegramAuthenticationService } from './services/telegram-authentication.service';
import { AuthenticationService } from './services/authentication.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AccessTokenGuard } from './guards/access-token.guard';
import { UserService } from 'src/users/services/user.service';
import { DbService } from 'src/db/db.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AccessTokenGuard,
    TelegramAuthenticationService,
    AuthenticationService,
    DbService,
    UserService,
  ],
})
export class AuthModule {}
