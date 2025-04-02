import { verbose } from "sqlite3";
const sqlite3 = verbose();

function initdb() {
  const db = new sqlite3.Database("database/db.sqlite", (err) => {
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

  return db;
}
const db = initdb();

export type User = {
  name: string;
  admin: number;
  password: string;
};

export type Election = {
  id: string;
  title: string;
  closed: boolean;
  candidates: { id: number; name: string }[];
  vote: number[];
  voted: string[];
};

export type Candidate = {
  role: string;
  candidates: string[];
  selected: number;
};

export function validateUser(
  userID: string,
  password: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM User WHERE UserID = ? AND password = ?",
      [userID, password],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(!!row);
        }
      },
    );
  });
}

export function getUser(userID: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT name, UserID as id, admin FROM User WHERE UserID = ?",
      [userID],
      (err, row: User) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      },
    );
  });
}

export function addUser(userID: string, name: string, password: string, admin: boolean): Promise<void> {
	return new Promise((resolve, reject) => {
		const query = "INSERT INTO User (UserID, name, password, admin) VALUES (?, ?, ?, ?)";

		db.run(query, [userID, name, password, admin], function (err) {
		  if (err) {
			reject(err);
		  } else {
			resolve();
		  }
		});
	});
}

export function getElection(): Promise<Election[]> {
  return new Promise((resolve, reject) => {
    // Query to fetch all elections
    db.all(
      `SELECT ElectionID, ElectionTitle, Closed FROM Election`,
      [],
      async (err, elections: any) => {
        if (err) {
          reject(err);
          return;
        }

        // Fetch candidates and votes for each election
        const electionData: Election[] = [];

        for (const election of elections) {
          const electionID = election.ElectionID;
          const title = election.ElectionTitle;
          const closed = election.Closed === 1;

          // Fetch candidates for the election
          const candidates: { id: number; name: string }[] = await new Promise(
            (res, rej) => {
              db.all(
                `SELECT CandidateID, CandidateName FROM Candidate WHERE ElectionID = ?`,
                [electionID],
                (err, rows) => {
                  if (err) rej(err);
                  else
                    res(
                      rows.map((row: any) => ({
                        id: row.CandidateID,
                        name: row.CandidateName,
                      })),
                    );
                },
              );
            },
          );

          // Fetch votes for the election
          const votes: number[] = [];
          const voted: string[] = await new Promise((res, rej) => {
            db.all(
              `SELECT CandidateID, UserID FROM Vote WHERE ElectionID = ?`,
              [electionID],
              (err, rows) => {
                if (err) rej(err);
                else {
                  res(rows.map((row: any) => row.UserID.toString())); // Users who voted
                  votes.push(...rows.map((row: any) => row.CandidateID)); // Candidate IDs with votes
                }
              },
            );
          });

          // Push data into electionData array
          electionData.push({
            id: electionID,
            title,
            closed,
            candidates,
            vote: votes,
            voted,
          });
        }

        resolve(electionData);
      },
    );
  });
}

export async function castVote(
  electionID: number,
  candidateID: number,
  userID: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check if the user has already voted in this election
    db.get(
      `SELECT * FROM Vote WHERE ElectionID = ? AND UserID = ?`,
      [electionID, userID],
      (err, row) => {
        if (err) {
          reject("Database error: " + err.message);
          return;
        }

        if (row) {
          resolve("❌ You have already voted in this election.");
          return;
        }

        // Insert the vote if the user hasn't voted yet
        db.run(
          `INSERT INTO Vote (ElectionID, CandidateID, UserID) VALUES (?, ?, ?)`,
          [electionID, candidateID, userID],
          function (err) {
            if (err) {
              reject("Database error: " + err.message);
            } else {
              resolve("✅ Vote successfully recorded!");
            }
          },
        );
      },
    );
  });
}

export function addElection(
  electionTitle: string,
  electionType: string,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Election (ElectionTitle, ElectionType) VALUES (?, ?)`;

    db.run(query, [electionTitle, electionType], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // Returns the new Election ID
      }
    });
  });
}

export function addCandidate(
  candidateName: string,
  electionID: number,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Candidate (CandidateName, ElectionID) VALUES (?, ?)`;

    db.run(query, [candidateName, electionID], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // Returns the new Candidate ID
      }
    });
  });
}

type ElectionWithVotes = {
  title: string;
  candidates: { id: number; name: string; votes: number }[];
};

export function getElectionsWithVotes(): Promise<ElectionWithVotes[]> {
  return new Promise((resolve, reject) => {
    // Query all elections
    db.all(
      `SELECT ElectionID, ElectionTitle FROM Election`,
      [],
      async (err, elections: any) => {
        if (err) {
          reject(err);
          return;
        }

        // Array to store election results
        const electionResults: ElectionWithVotes[] = [];

        // Loop through each election
        for (const election of elections) {
          const electionID = election.ElectionID;
          const title = election.ElectionTitle;

          // Fetch candidates and their vote counts
          const candidates: { id: number; name: string; votes: number }[] =
            await new Promise((res, rej) => {
              db.all(
                `
            SELECT c.CandidateID, c.CandidateName, 
                   COALESCE(COUNT(v.CandidateID), 0) AS voteCount
            FROM Candidate c
            LEFT JOIN Vote v ON c.CandidateID = v.CandidateID
            WHERE c.ElectionID = ?
            GROUP BY c.CandidateID
            `,
                [electionID],
                (err, rows: any) => {
                  if (err) rej(err);
                  else
                    res(
                      rows.map((row: any) => ({
                        id: row.CandidateID,
                        name: row.CandidateName,
                        votes: row.voteCount,
                      })),
                    );
                },
              );
            });

          // Store election data
          electionResults.push({ title, candidates });
        }

        resolve(electionResults);
      },
    );
  });
}

export function getElectionForUser(userID: string): Promise<Election[]> {
  return new Promise((resolve, reject) => {
    // Query elections the user has *not* voted in
    db.all(
      `
      SELECT Election.ElectionID, Election.ElectionTitle, Election.Closed
      FROM Election
      WHERE Election.ElectionID NOT IN (
        SELECT DISTINCT ElectionID FROM Vote WHERE UserID = ?
      ) AND Election.Closed = 0
      `,
      [userID],
      async (err, elections: any) => {
        if (err) {
          reject(err);
          return;
        }

        const electionData: Election[] = [];

        // Loop through each election
        for (const election of elections) {
          const electionID = election.ElectionID;
          const title = election.ElectionTitle;
          const closed = election.Closed;

          // Fetch candidates for the election
          const candidates: { id: number; name: string }[] = await new Promise(
            (res, rej) => {
              db.all(
                `SELECT CandidateID, CandidateName FROM Candidate WHERE ElectionID = ?`,
                [electionID],
                (err, rows: any) => {
                  if (err) rej(err);
                  else
                    res(
                      rows.map((row: any) => ({
                        id: row.CandidateID,
                        name: row.CandidateName,
                      })),
                    );
                },
              );
            },
          );

          // Fetch votes for the election
          const votes: number[] = [];
          const voted: string[] = await new Promise((res, rej) => {
            db.all(
              `SELECT CandidateID, UserID FROM Vote WHERE ElectionID = ?`,
              [electionID],
              (err, rows: any) => {
                if (err) rej(err);
                else {
                  res(rows.map((row: any) => row.UserID)); // Users who voted
                  votes.push(...rows.map((row: any) => row.CandidateID)); // Candidate IDs with votes
                }
              },
            );
          });

          // Push data into electionData array
          electionData.push({
            id: electionID,
            title,
            closed,
            candidates,
            vote: votes,
            voted,
          });
        }

        resolve(electionData);
      },
    );
  });
}

export function closeElection(electionId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    // Validate the election ID
    if (!electionId || typeof electionId !== "number" || electionId <= 0) {
      return reject(new Error("Invalid election ID"));
    }

    // First check if the election exists
    db.get(
      "SELECT ElectionID FROM Election WHERE ElectionID = ?",
      [electionId],
      (err: Error, row: any) => {
        if (err) {
          return reject(err);
        }

        if (!row) {
          return reject(new Error(`Election with ID ${electionId} not found`));
        }

        // If election exists, update its closed status
        db.run(
          "UPDATE Election SET Closed = 1 WHERE ElectionID = ?",
          [electionId],
          (updateErr: Error) => {
            if (updateErr) {
              return reject(updateErr);
            }

            resolve();
          },
        );
      },
    );
  });
}
