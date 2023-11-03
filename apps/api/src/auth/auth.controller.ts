import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { TelegramLoginDto } from './dtos/telegram-login.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type';
import { AuthenticationService } from './services/authentication.service';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(200)
  @Post('login/telegram')
  login(@Body() body: TelegramLoginDto) {
    try {
      return this.authenticationService.signInWithTelegramInitData(body);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Auth(AuthType.Bearer)
  @Get('login/test/telegram')
  test() {
    return true;
  }

  @Get('login/test/public')
  testPublic() {
    return true;
  }
}
