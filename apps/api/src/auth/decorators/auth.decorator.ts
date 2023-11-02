import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type';

export const AUTH_TYPE_KEY = 'AUTH_TYPE_KEY';

export const Auth = (...args: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, args);
