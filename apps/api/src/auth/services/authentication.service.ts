import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TelegramLoginDto } from '../dtos/telegram-login.dto';
import { TelegramAuthenticationService } from './telegram-authentication.service';
import { InitData } from '@tma.js/init-data-node';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly telegramAuthenticationService: TelegramAuthenticationService,
  ) {}

  async signInWithTelegramInitData(telegramLoginDto: TelegramLoginDto) {
    try {
      // 1. Verify the user's data
      const userData = await this.telegramAuthenticationService.verifyInitData(
        telegramLoginDto.initData,
      );
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
    const accessToken = await this.signToken(
      user.id,
      this.jwtConfiguration.accessTokenTtl,
      user,
    );

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

  private async getOrCreateUserByTelegramData(
    userData: InitData['user'],
  ): Promise<User> {
    // TODO: Implement with repository
    const id = userData.id;
    const firstName = userData.firstName;

    const user = new User();
    user.id = '123-123-123-123';
    user.telegramId = id;
    user.telegramUsername = firstName;

    return user;
  }
}
