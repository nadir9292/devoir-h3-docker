CREATE TABLE IF NOT EXISTS QUESTION (
  id SERIAL PRIMARY KEY,
  interrogation VARCHAR(255),
  first_answer VARCHAR(255),
  second_answer VARCHAR(255),
  third_answer VARCHAR(255),
  fourth_answer VARCHAR(255),
  good_answer INTEGER,
  points INTEGER
);

CREATE TABLE IF NOT EXISTS USERS (
  id SERIAL PRIMARY KEY,
  pseudo VARCHAR(255),
  total_points INTEGER,
  passwordHash VARCHAR(255),
  passwordSalt VARCHAR(255)
);
