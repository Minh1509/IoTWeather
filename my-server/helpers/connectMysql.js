const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecommerce",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  conn.query("select * from datasensor", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
  console.log("Connected to MySQL");
});

module.exports = conn;

