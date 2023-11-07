import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ActiveUser } from './decorators/active-user.decorator';
import { Auth } from './decorators/auth.decorator';
import { TelegramLoginDto } from './dtos/telegram-login.dto';
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
  test(@ActiveUser() user: User) {
    console.log('user', user);
    return true;
  }
}
