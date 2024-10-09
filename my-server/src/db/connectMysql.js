'use strict'

const mysql = require("mysql");
require('dotenv').config();
const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

conn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Kết nối thành công đến MySQL");
});

module.exports = conn;