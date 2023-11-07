import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { REQUEST_USER_KEY } from '../auth.constants';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<User & { sub: string }>(
        token,
        this.jwtConfiguration,
      );

      const {
        firstName,
        lastName,
        telegramId,
        telegramUsername,
        avatarUrl,
        sub: id,
      } = payload;

      request[REQUEST_USER_KEY] = {
        avatarUrl,
        firstName,
        id,
        lastName,
        telegramId,
        telegramUsername,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // @ts-expect-error - The header is not typed
    const [type, token] = request.headers.authorization?.split(' ') ?? [
      undefined,
      undefined,
    ];
    return type === 'Bearer' ? token : undefined;
  }
}
