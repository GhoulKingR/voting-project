const sqlite3 = require("sqlite3").verbose();

  const db = new sqlite3.Database("db.sqlite", (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  db.serialize(() => {
    // Create User table
    db.run(`CREATE TABLE IF NOT EXISTS User (
            UserID TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
			admin BOOLEAN NOT NULL
        )`);

    // Create Election table
    db.run(`CREATE TABLE IF NOT EXISTS Election (
            ElectionID INTEGER PRIMARY KEY AUTOINCREMENT,
            ElectionTitle TEXT NOT NULL,
			ElectionType TEXT NOT NULL,
			Closed BOOLEAN NOT NULL DEFAULT 0
        )`);

    // Create Candidate table
    db.run(`CREATE TABLE IF NOT EXISTS Candidate (
            CandidateID INTEGER PRIMARY KEY AUTOINCREMENT,
            CandidateName TEXT NOT NULL,
            ElectionID INTEGER NOT NULL,
            FOREIGN KEY (ElectionID) REFERENCES Election(ElectionID) ON DELETE CASCADE
        )`);

    // Create Vote table
    db.run(`CREATE TABLE IF NOT EXISTS Vote (
            ElectionID INTEGER NOT NULL,
            CandidateID INTEGER NOT NULL,
            UserID INTEGER NOT NULL,
            PRIMARY KEY (ElectionID, UserID),
            FOREIGN KEY (ElectionID) REFERENCES Election(ElectionID) ON DELETE CASCADE,
            FOREIGN KEY (CandidateID) REFERENCES Candidate(CandidateID) ON DELETE CASCADE,
            FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
        )`);
  });

db.close();
