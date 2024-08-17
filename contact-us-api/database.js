const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "contact-form.db"),
  (err) => {
    if (err) {
      console.error("Failed to connect to the database:", err);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

// Create the contact submissions table if it doesn't exist
db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            message TEXT NOT NULL,
            submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});


module.exports = db;
