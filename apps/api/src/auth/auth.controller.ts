import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { TelegramLoginDto } from './dtos/telegram-login.dto';
import { TelegramAuthenticationService } from './services/telegram-authentication.service';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly telegramAuthService: TelegramAuthenticationService,
  ) {}

  @HttpCode(200)
  @Post('login/telegram')
  login(@Body() body: TelegramLoginDto) {
    try {
      return this.telegramAuthService.verifyInitData(body.initData);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Auth(AuthType.Telegram)
  @Get('login/test/telegram')
  test() {
    return true;
  }
}
