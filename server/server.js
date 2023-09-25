const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const { Client } = require('pg');

app.use(cors({
    origin: ['https://www.section.io', 'https://www.google.com/']
}));

app.use(express.urlencoded({ extended: false }));
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());
app.use(bodyParser.json());

const fs = require('fs');
 

// Enable CORS for all origins (allow all origins)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins, you can set specific origins as well
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// (async () => {
//   const client = new Client({
//     port: process.env.DB_PORT,
//     host: process.env.DB_HOSTNAME,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DBDATABASE_NAME,
//     server_url: process.env.SERVER_URL,
//     ssl: true
//   });
  
//   await client.connect();
  
//   const res = await client.query('SELECT * from users');
//   console.log(res);
//   await client.end();
// })().catch(console.error);

// const port = process.env.PORT || 5000;
const port = 5000
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", function (request, response) {
  response.send(
    "Your server is listening"
  );
});

app.get("/Users", function (request, response) {
  response.send({ users });
});


