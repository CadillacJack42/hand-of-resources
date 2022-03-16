-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS boxers;

CREATE TABLE boxers (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    wins INT NOT NULL,
    losses INT NOT NULL,
)