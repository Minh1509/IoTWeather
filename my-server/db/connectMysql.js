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
  // conn.query("ALTER TABLE datasensor ADD COLUMN smoke INT", (err, result) => {
  //   if(err){
  //     throw err;
  //   }
  //   console.log(result);
  // })
  console.log("Kết nối thành công đến MySQL");
});

module.exports = conn;