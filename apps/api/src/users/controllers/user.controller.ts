import { Body, Controller, Get, Header, Post, Put, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { User, UpdateUserDataDto, UserProfileRequest } from '@samovar/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profiles')
  @Header('Cache-Control', 'no-cache')
  async getUserProfiles(@ActiveUser() user: User) {
    return this.userService.getUserProfilesByUserId(user.id);
  }

  @Post('profiles/search')
  @Header('Cache-Control', 'no-cache')
  async getUserProfilesByLocation(@ActiveUser() user: User, @Body() data: UserProfileRequest) {
    return this.userService.getUserProfilesByLocation(user.id, data.lat, data.long, data.dist);
  }

  // TODO
  @Post('profiles')
  @Header('Cache-Control', 'no-cache')
  async createNewUserProfile() {}

  @Put('data')
  @Header('Cache-Control', 'no-cache')
  async updateUserData(@ActiveUser() user: User, @Body() data: UpdateUserDataDto) {
    return this.userService.upsertUserDataByUserId(user.id, data);
  }

  @Post('avatar')
  async uploadAvatar(@ActiveUser() user: User, @Req() request) {
    const file = await request.file();

    return await this.userService.uploadAvatar(user.id, file);
  }
}
