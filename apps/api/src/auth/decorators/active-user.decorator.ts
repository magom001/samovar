import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@samovar/models';
import { REQUEST_USER_KEY } from '../auth.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
