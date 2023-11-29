export enum UserProfileType {
  Musician = 'musician',
  Singer = 'singer',
}

export class UserProfile {
  id!: string;
  type!: UserProfileType;
  value!: string;
  latitude!: number;
  longitude!: number;
}

export class UserProfileRequest {
  lat!: number;
  long!: number;
  dist!: number;
}
