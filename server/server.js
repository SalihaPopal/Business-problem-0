const express = require("express");
const app = express();
const config = app.get("config");
const { Pool} = require("pg");
const cors = require("cors");
require('dotenv').config();

// Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const db = new Pool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DBDATABASE_NAME,
  server_url: process.env.SERVER_URL,
  ssl: true
});





