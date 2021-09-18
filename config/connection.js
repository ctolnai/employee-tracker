const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
  {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 3306
  }
);

module.exports = db;
