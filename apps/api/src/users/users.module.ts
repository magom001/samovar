import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { HttpModule } from '@nestjs/axios';
import { ImageUploadService } from './services/image-upload.service';
import { ImgurService } from './services/imgur.service';

@Module({
  imports: [HttpModule],
  providers: [
    DbService,
    UserService,
    {
      provide: ImageUploadService,
      useClass: ImgurService,
    },
  ],
  controllers: [UserController],
  exports: [UserService, DbService, HttpModule, ImageUploadService],
})
export class UsersModule {}
