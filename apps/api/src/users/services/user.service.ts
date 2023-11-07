import { Injectable } from '@nestjs/common';
import { InitData } from '@tma.js/init-data-node';
import { DbService } from 'src/db/db.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async getOrCreateUserFromTelegramData(
    userData: InitData['user'],
  ): Promise<User> {
    const newUser = new User();
    newUser.telegramId = userData.id;
    newUser.firstName = userData.firstName;
    newUser.lastName = userData.lastName;
    newUser.avatarUrl = userData.photoUrl;
    newUser.telegramUsername = userData.username;

    const users = await this.dbService.sql<User[]>`
      INSERT INTO users ${this.dbService.sql(newUser)}
      ON CONFLICT (telegram_id) DO UPDATE SET updated_at=NOW(), avatar_url=COALESCE(excluded.avatar_url, ${
        newUser.avatarUrl
      })
      RETURNING *
    `;

    return users[0];
  }
}
