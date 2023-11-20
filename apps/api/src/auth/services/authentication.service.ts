import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InitData } from '@tma.js/init-data-node';
import { UserService } from 'src/users/services/user.service';
import jwtConfig from '../config/jwt.config';
import { TelegramLoginDto } from '../dtos/telegram-login.dto';
import { TelegramAuthenticationService } from './telegram-authentication.service';
import { User } from '@samovar/models';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly telegramAuthenticationService: TelegramAuthenticationService,
  ) {}

  async signInWithTelegramInitData(telegramLoginDto: TelegramLoginDto) {
    try {
      // 1. Verify the user's data
      const userData = await this.telegramAuthenticationService.verifyInitData(telegramLoginDto.initData);
      // 2. Check if a user with the telegramId exists in the db
      // 3. Create if not exists
      const user = await this.getOrCreateUserByTelegramData(userData);

      // 4. Generate token with user data
      return this.generateAccessToken(user);
    } catch (error) {
      console.error('signInTelegram', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async generateAccessToken(user: User) {
    const { id, ...payload } = user;
    const accessToken = await this.signToken(id, this.jwtConfiguration.accessTokenTtl, payload);

    return { accessToken };
  }

  private signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        ...(payload || {}),
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  private getOrCreateUserByTelegramData(userData: InitData['user']): Promise<User> {
    return this.userService.getOrCreateUserFromTelegramData(userData);
  }
}
