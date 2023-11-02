import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TelegramAuthenticationService } from '../services/telegram-authentication.service';
import { TELEGRAM_USER_DATA_KEY } from '../auth.constants';

const HEADER_KEY = 'x-telegram-auth';

@Injectable()
export class TelegramGuard implements CanActivate {
  constructor(
    private readonly telegramAuthenticationService: TelegramAuthenticationService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authToken = request.headers[HEADER_KEY];

    if (!authToken) {
      throw new UnauthorizedException();
    }

    try {
      const user = this.telegramAuthenticationService.verifyInitData(authToken);
      request[TELEGRAM_USER_DATA_KEY] = user;
    } catch (error) {
      console.error(error, authToken);

      throw new UnauthorizedException();
    }

    return true;
  }
}
