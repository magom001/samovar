import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from './services/user.service';

@Module({
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
