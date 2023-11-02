import { Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login/telegram')
  login() {
    throw new UnauthorizedException();
  }
}
