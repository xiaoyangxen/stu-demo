const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.NODE_ENV == "development" ? "127.0.0.1" : "",
  user: "root",
  password: "admin123",
  database: "my_db_01",
});

module.exports = db;
