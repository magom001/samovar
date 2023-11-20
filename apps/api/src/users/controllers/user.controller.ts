import { Body, Controller, Get, Header, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { User, UpdateUserDataDto } from '@samovar/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profiles')
  @Header('Cache-Control', 'non')
  async getUserProfiles(@ActiveUser() user: User) {
    return this.userService.getUserProfilesByUserId(user.id);
  }

  // TODO
  @Post('profiles')
  async createNewUserProfile() {}

  @Put('data')
  async updateUserData(@ActiveUser() user: User, @Body() data: UpdateUserDataDto) {
    return this.userService.upsertUserDataByUserId(user.id, data);
  }
}
