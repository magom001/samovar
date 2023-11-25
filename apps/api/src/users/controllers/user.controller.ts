import { Body, Controller, Get, Header, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { User, UpdateUserDataDto, UserProfileRequest } from '@samovar/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profiles')
  @Header('Cache-Control', 'non')
  async getUserProfiles(@ActiveUser() user: User) {
    return this.userService.getUserProfilesByUserId(user.id);
  }

  @Post('profiles/search')
  @Header('Cache-Control', 'non')
  async getUserProfilesByLocation(@ActiveUser() user: User, @Body() data: UserProfileRequest) {
    return this.userService.getUserProfilesByLocation(user.id, data.lat, data.long, data.dist);
  }

  // TODO
  @Post('profiles')
  async createNewUserProfile() {}

  @Put('data')
  async updateUserData(@ActiveUser() user: User, @Body() data: UpdateUserDataDto) {
    return this.userService.upsertUserDataByUserId(user.id, data);
  }
}
