CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    authors TEXT NOT NULL,
    isbn10 VARCHAR(10) UNIQUE,
    isbn13 VARCHAR(13) UNIQUE,
    count INTEGER DEFAULT 0,
    borrowed_count INTEGER DEFAULT 0
 );

CREATE TABLE IF NOT EXISTS book_copies (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    borrowed BOOLEAN DEFAULT FALSE,
    qr_code TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS borrowed_books (
    id SERIAL PRIMARY KEY,
    book_copy_id INTEGER REFERENCES book_copies(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL,
    borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    returned_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
 
  PRIMARY KEY (identifier, token)
);
 
CREATE TABLE IF NOT EXISTS accounts
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
 
  PRIMARY KEY (id)
);
 
CREATE TABLE IF NOT EXISTS sessions
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,
 
  PRIMARY KEY (id)
);
 
CREATE TABLE IF NOT EXISTS users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
 
  PRIMARY KEY (id)
);