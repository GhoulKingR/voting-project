const sqlite3 = require("sqlite3").verbose();

// Open database connection
const db = new sqlite3.Database("db.sqlite");

// Election data
const elections = {
  President: {
    title: "President",
    candidates: [
      { id: 0, name: "Bukola Ajay" },
      { id: 1, name: "Akinola Right" },
      { id: 3, name: "Ashley John" },
    ],
  },
  "Vice President": {
    title: "Vice President",
    candidates: [
      { id: 0, name: "Enitan Akanbi" },
      { id: 1, name: "Eniola Eniori" },
      { id: 3, name: "Emmanuel Samide" },
    ],
  },
  Secretary: {
    title: "Secretary",
    candidates: [
      { id: 0, name: "Balqis Michael" },
      { id: 1, name: "Esther John" },
      { id: 3, name: "Shade Ruth" },
    ],
  },
  Treasurer: {
    title: "Treasurer",
    candidates: [
      { id: 0, name: "Alex Johnson" },
      { id: 1, name: "Sarah Chinedu" },
      { id: 3, name: "Kelvinson Isaac" },
    ],
  },
};

// Function to insert an election and return its ID
function insertElection(title) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Election (ElectionTitle, ElectionType) VALUES (?, "Department Executives")`,
      [title],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID); // Return the new election's ID
        }
      },
    );
  });
}

// Function to insert a candidate
function insertCandidate(name, electionID) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Candidate (CandidateName, ElectionID) VALUES (?, ?)`,
      [name, electionID],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID); // Return new Candidate ID
        }
      },
    );
  });
}

// Function to populate the database
async function populateDatabase() {
  try {
    for (const key in elections) {
      const election = elections[key];
      console.log(`Adding Election: ${election.title}`);

      // Insert Election and get its ID
      const electionID = await insertElection(election.title);
      console.log(`Election "${election.title}" added with ID: ${electionID}`);

      // Insert Candidates
      for (const candidate of election.candidates) {
        const candidateID = await insertCandidate(candidate.name, electionID);
        console.log(
          `Candidate "${candidate.name}" added with ID: ${candidateID}`,
        );
      }
    }

    console.log("✅ Database population completed!");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    db.close(); // Close database connection
  }
}

// Run the function
populateDatabase();
