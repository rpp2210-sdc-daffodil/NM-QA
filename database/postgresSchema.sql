

CREATE TABLE questions (
  question_id INTEGER PRIMARY KEY,
  question_body TEXT NOT NULL,
  question_date VARCHAR(50) DEFAULT NOW(),
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(254) NOT NULL,
  question_helpfulness INTEGER NOT NULL DEFAULT 0,
  product_id INTEGER NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE answers (
  answer_id INTEGER PRIMARY KEY,
  question_id INTEGER REFERENCES questions(question_id),
  body TEXT NOT NULL,
  date_written VARCHAR(50) DEFAULT NOW(),
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(254) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE photos (
  answer_id INTEGER REFERENCES answers(answer_id),
  id INTEGER PRIMARY KEY,
  url TEXT NOT NULL
);