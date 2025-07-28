-- Enable extensions for better text search performance
CREATE EXTENSION IF NOT EXISTS pg_trgm;

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

CREATE TABLE IF NOT EXISTS library_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    batch_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books_db (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  authors TEXT,
  isbn10 VARCHAR(10) UNIQUE,
  isbn13 VARCHAR(13) UNIQUE
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

-- Performance Indexes

-- Library Users table indexes
CREATE INDEX IF NOT EXISTS idx_library_users_email ON library_users(email);

-- Books table indexes
CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
-- Text search index for fuzzy search performance
CREATE INDEX IF NOT EXISTS idx_books_title_gin ON books USING gin(title gin_trgm_ops);
-- Composite index for pagination with search
CREATE INDEX IF NOT EXISTS idx_books_id_title ON books(id, title);
CREATE INDEX IF NOT EXISTS idx_books_isbn10 ON books(isbn10);
CREATE INDEX IF NOT EXISTS idx_books_isbn13 ON books(isbn13);

CREATE INDEX IF NOT EXISTS idx_books_db_isbn10 ON books_db(isbn10);
CREATE INDEX IF NOT EXISTS idx_books_db_isbn13 ON books_db(isbn13);

-- Book copies table indexes
CREATE INDEX IF NOT EXISTS idx_book_copies_book_id ON book_copies(book_id);
CREATE INDEX IF NOT EXISTS idx_book_copies_borrowed ON book_copies(borrowed);
CREATE INDEX IF NOT EXISTS idx_book_copies_qr_code ON book_copies(qr_code);

-- Borrowed books table indexes
CREATE INDEX IF NOT EXISTS idx_borrowed_books_book_copy_id ON borrowed_books(book_copy_id);
CREATE INDEX IF NOT EXISTS idx_borrowed_books_user_id ON borrowed_books(user_id);
CREATE INDEX IF NOT EXISTS idx_borrowed_books_user_borrowed ON borrowed_books(user_id, borrowed_at) WHERE returned_at IS NULL;

-- Authentication table indexes
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts("userId");
CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider, "providerAccountId");

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions("userId");
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions("sessionToken");
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE INDEX IF NOT EXISTS idx_verification_token_identifier ON verification_token(identifier);
CREATE INDEX IF NOT EXISTS idx_verification_token_expires ON verification_token(expires);