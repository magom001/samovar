import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserService } from './services/user.service';

@Module({
  providers: [DbService, UserService],
})
export class UsersModule {}
