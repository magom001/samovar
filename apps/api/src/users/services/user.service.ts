import { Injectable } from '@nestjs/common';
import { InitData } from '@tma.js/init-data-node';
import { DbService } from 'src/db/db.service';
import { User, UserData } from '../entities/user.entity';
import { UserProfile } from '../entities/user_profile_entity';
import { UpdateUserDataDto } from '../dtos/update_user_data.dto';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  /**
   * Creates or updates user from telegram data.
   *
   * @param userData user data object from telegram.
   * @returns User object from database.
   */
  async getOrCreateUserFromTelegramData(
    userData: InitData['user'],
  ): Promise<User> {
    const newUser = new User();
    newUser.telegramId = userData.id;
    newUser.telegramUsername = userData.username;

    const users = await this.dbService.sql<User[]>`
      INSERT INTO users ${this.dbService.sql(newUser)}
      ON CONFLICT (telegram_id) DO UPDATE SET updated_at=NOW()
      RETURNING *
    `;

    return users[0];
  }

  /**
   * Return user's personal data, e.g. first name, last name, etc.
   *
   * @param userId - GUID of the user.
   * @returns user's data.
   */
  async getUserDataByUserId(userId: string): Promise<UserData> {
    const users = await this.dbService.sql<UserData[]>`
      SELECT users.id, users.telegram_id, users.telegram_username, user_data.data FROM users
      LEFT JOIN user_data ON user_data.user_id=users.id
      WHERE users.id=${userId}
    `;

    return users[0];
  }

  /**
   * Upsert user's data.
   *
   * @param userId - GUID of the user.
   * @param data - user's data.
   * @returns updated user's data.
   */
  async upsertUserDataByUserId(userId: string, data: UpdateUserDataDto) {
    const users = await this.dbService.sql<UserData[]>`
      INSERT INTO user_data (user_id, data) VALUES (${userId}, ${data})
      ON CONFLICT (user_id) DO UPDATE SET data=${data as any}, updated_at=NOW()
      RETURNING *
    `;

    return users[0];
  }

  async getUserProfilesByUserId(userId: string): Promise<UserProfile[]> {
    const userProfiles = await this.dbService.sql<UserProfile[]>`
      SELECT id, type, value, st_y(location::geometry) as latitutde, st_x(location::geometry) as longitude FROM user_profiles WHERE user_id=${userId}
    `;

    return userProfiles;
  }
}
