import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  providers: [DbService, UserService],
  controllers: [UserController],
})
export class UsersModule {}
