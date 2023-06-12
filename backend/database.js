var mysql = require("mysql2");
const connectionInfo = {
  host: "localhost",
  user: "root",
  password: "your_password", // change here
  database: "FullStackProject6",
};

var con = mysql.createConnection(connectionInfo);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
