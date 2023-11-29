import type { UserProfile } from './user-profile';

export class User {
  id!: string;
  telegramId?: number;
  telegramUsername?: string;
}

export class UserData extends User {
  data?: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  };
  profiles?: UserProfile[];
}
