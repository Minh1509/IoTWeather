const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecommerce",
});

conn.connect((err) => {
  if (err) {
    throw err;
  }
  // conn.query("select * from action_history", (err, result) => {
  //   if(err){
  //     throw err;
  //   }
  //   console.log(result);
  // })
  console.log("Kết nối thành công đến MySQL");
});

module.exports = conn;

