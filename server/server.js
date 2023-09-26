const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { Client } = require("pg");
require("dotenv").config();


const cors = require('cors');
app.use(cors({
    origin: ['https://www.section.io', 'https://www.google.com/']
}));

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// Enable CORS for requests from 'http://localhost:3000'
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*', 'http://localhost:3000');
  next();
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const db = new Client({
  port: process.env.DB_PORT,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DBDATABASE_NAME,
  server_url: process.env.SERVER_URL,
  ssl: true
});

db.connect(function (err){
  if (err) {
    console.error(err);
  };
  console.log("Connected to the database");
});


app.get("/Users", function (req, res) {
  db.query("SELECT * FROM Users")
    .then((result) => {
      res.status(200).json({ Users: result.rows });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.get("/Sessions", (req, res) => {
  let claimedSession;

  // Find an available session and claim it
  db.query(
    "UPDATE Sessions SET Session_Status = 'Claimed' WHERE SessionID = (SELECT SessionID FROM Sessions WHERE Session_Status = 'Available' AND (Is_Morning = true OR Is_Evening = true) LIMIT 1) RETURNING *;"
  )
    .then((result) => {
      // Check if a session was successfully claimed
      if (result.rows.length > 0) {
        claimedSession = result.rows[0];
        return db.query("SELECT * FROM Users");
      } else {
        return Promise.reject("No available sessions to claim.");
      }
    })
    .then((userResult) => {
      res.status(200).json({
        Users: userResult.rows,
        ClaimedSession: claimedSession,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred." });
    });
});

// app.get('/Sessions/claim-session', (req, res) => {
//   console.log("hi")
// });


// app.post('/Sessions/claim-session', async (req, res) => {
//   const { SessionID } = req.body;

//   try {
//     // Check if the session is available
//     const sessionQuery = 'SELECT * FROM Sessions WHERE SessionID = $1 AND Session_Status = $2';
//     const sessionResult = await db.query(sessionQuery, [SessionID, 'Available']);

//     if (sessionResult.rowCount === 0) {
//       return res.status(400).json({ message: 'Session not available for claiming.' });
//     }

//     // Claim the session by updating its status and associating it with the volunteer
//     const claimQuery = 'UPDATE Sessions SET Session_Status = $1, VolunteerID = $2 WHERE SessionID = $3';
//     await db.query(claimQuery, ['Claimed', volunteerID, SessionID]);

//     res.status(200).json({ message: 'Session claimed successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while claiming the session.' });
//   }
// });






