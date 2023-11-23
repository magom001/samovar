CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    telegram_id integer,
    telegram_username VARCHAR,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_telegram_id ON users (telegram_id);

CREATE TABLE IF NOT EXISTS user_data (
	user_id uuid PRIMARY KEY REFERENCES users(id),
	data jsonb,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TYPE profile_type AS ENUM ('musician', 'singer');

CREATE TABLE IF NOT EXISTS user_profiles (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	type profile_type,
	value jsonb DEFAULT '{}'::jsonb,
	user_id uuid REFERENCES users(id),
    location geography(POINT),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS user_profiles_geo_index ON user_profiles USING GIST (location);
