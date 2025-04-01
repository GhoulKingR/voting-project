const sqlite3 = require("sqlite3").verbose();

// Connect to the SQLite database
const db = new sqlite3.Database("db.sqlite");

// User data to insert
const users = [
  { id: "505", name: "Lekan James", admin: true, password: "126621" },
  { id: "1234", name: "Chigozie Oduah", admin: false, password: "abcba" },
  { id: "6661", name: "Emmanuel Oduah", admin: false, password: "cbabc" },
];

// Create the User table if it doesn't exist
db.run(
  `
    CREATE TABLE IF NOT EXISTS User (
        UserID TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        admin BOOLEAN NOT NULL
    )
`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
      return db.close();
    }

    console.log("User table is ready.");

    // Insert users into the table
    const stmt = db.prepare(
      "INSERT INTO User (UserID, name, password, admin) VALUES (?, ?, ?, ?)",
    );

    users.forEach((user) => {
      stmt.run(user.id, user.name, user.password, user.admin, (err) => {
        if (err) {
          console.error(`Error inserting user ${user.name}:`, err.message);
        } else {
          console.log(`Inserted user: ${user.name}`);
        }
      });
    });

    stmt.finalize(() => {
      console.log("All users inserted.");
      db.close();
    });
  },
);
