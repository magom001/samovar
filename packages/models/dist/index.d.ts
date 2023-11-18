declare class User {
    id: string;
    telegramId?: number;
    telegramUsername?: string;
}
declare class UserData extends User {
    data?: {
        firstName?: string;
        lastName?: string;
        avatarUrl?: string;
    };
}

declare enum UserProfileType {
    Musician = "musician",
    Singer = "singer"
}
declare class UserProfile {
    id: string;
    type: UserProfileType;
    value: string;
    latitude: number;
    longitude: number;
}

declare class UpdateUserDataDto {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
}

export { UpdateUserDataDto, User, UserData, UserProfile, UserProfileType };
