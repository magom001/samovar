import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../enums/auth-type';
import { AUTH_TYPE_KEY } from '../decorators/auth.decorator';
import { TelegramGuard } from './telegram.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthTypes = [AuthType.Telegram];

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Telegram]: this.telegramGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly telegramGuard: TelegramGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes =
      this.reflector.getAllAndOverride<AuthType[]>(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthenticationGuard.defaultAuthTypes;

    const guards = authTypes
      .map((authType) => this.authTypeGuardMap[authType])
      .flat();

    let currentError = new UnauthorizedException();

    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((error) => {
        currentError = error;
      });

      if (canActivate) {
        return true;
      }
    }

    throw currentError;
  }
}
