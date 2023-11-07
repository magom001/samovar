CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id UUID DEFAULT uuid_generate_v4(),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR,
    avatar_url VARCHAR,
    telegram_id integer,
    telegram_username VARCHAR,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_telegram_id ON users (telegram_id);
