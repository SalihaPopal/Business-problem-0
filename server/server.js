const bodyParser = require("body-parser");
const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const app = express();

const cors = require('cors');
app.use(cors({
    origin: ['https://www.section.io', 'https://www.google.com/']
}));

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// Enable CORS for requests from 'http://localhost:3000'
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const db = new Pool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DBDATABASE_NAME,
  server_url: process.env.SERVER_URL,
  ssl: false
});

db.connect(function (err){
  if (err) {
    console.error(err);
  };
  console.log("Connected to the database");
});

app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
  })

app.get("/", function (request, response) {
  response.send(
    "Your server is listening."
  );
});

app.get("/Users", function (request, response) {
  response.json(
    { Users}
  );
});


// app.get("/Users", (req, res) => {
//   let claimedSession;

//   // Find an available session and claim it
//   Client.query(
//     "UPDATE Sessions SET Session_Status = 'Claimed' WHERE SessionID = (SELECT SessionID FROM Sessions WHERE Session_Status = 'Available' AND (Is_Morning = true OR Is_Evening = true) LIMIT 1) RETURNING *;"
//   )
//     .then((result) => {
//       // Check if a session was successfully claimed
//       if (result.rows.length > 0) {
//         claimedSession = result.rows[0];
//         return Client.query("SELECT * FROM Users");
//       } else {
//         return Promise.reject("No available sessions to claim.");
//       }
//     })
//     .then((userResult) => {
//       res.status(200).json({
//         Users: userResult.rows,
//         ClaimedSession: claimedSession,
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred." });
//     });
// });



const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});