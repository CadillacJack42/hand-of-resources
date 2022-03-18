-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS boxers, contacts, cars, cannabis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE boxers (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    wins INT NOT NULL,
    losses INT NOT NULL
);


CREATE TABLE contacts (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    user_id uuid DEFAULT uuid_generate_v4 (),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL
);

CREATE TABLE cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    manual_transmission BOOLEAN
);

CREATE TABLE cannabis (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strain TEXT NOT NULL
);
