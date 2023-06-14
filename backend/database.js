var mysql = require("mysql2");
const connectionInfo = require("./connectionInfo").connectionInfo;

var con = mysql.createConnection(connectionInfo);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
