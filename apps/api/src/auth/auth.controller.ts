import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@samovar/models';
import { ActiveUser } from './decorators/active-user.decorator';
import { Auth } from './decorators/auth.decorator';
import { TelegramLoginDto } from './dtos/telegram-login.dto';
import { AuthType } from './enums/auth-type';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from 'src/users/services/user.service';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

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
  @Get('whoami')
  async whoami(@ActiveUser() user: User) {
    console.trace('whoami', user);
    return await this.userService.getUserDataByUserId(user.id);
  }
}
