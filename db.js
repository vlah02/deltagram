const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('deltagram.sqlite');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS uploads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      filename TEXT,
      created_at TEXT,
      file_hash TEXT
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS diffs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      from_upload_id INTEGER,
      to_upload_id INTEGER,
      followers_added TEXT,
      followers_removed TEXT,
      following_added TEXT,
      following_removed TEXT
    )
  `);
});

module.exports = db;
