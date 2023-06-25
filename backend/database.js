var mysql = require("mysql2");
const connectionInfo = require("./connectionInfo").connectionInfo;

var con = mysql.createConnection(connectionInfo);

// exports.getTodos = function (userId) {
//   var finalResult = 13;
//   var t = con.connect(function (err) {
//     if (err) throw err;
//     var x;
//     let y = con.query(
//       `SELECT * FROM FullStackProject6.todos WHERE userId=${userId} `,
//       function (err, result, fields) {
//         if (err) throw err;
//         //  console.log(result);
//         //  x = result;
//         x = JSON.stringify(result);
//         // finalResult=12;
//         // console.log(x);
//         return x;
//       }
//     );
//     finalResult = x;
//     console.log(y);
//     finalResult = y;
//   });

//   //finalResult=111111;
//   return t;
// };

// exports.executeQuery = function (query) {
//   return new Promise((resolve, reject) => {
//     con.query(query, (error, results, fields) => {
//       if (error) {
//         reject("Error executing the query: " + error.stack);
//         return;
//       }

//       resolve(results);
//     });
//   });
// };

exports.getTodos = function (userId) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM FullStackProject6.todos WHERE userId=${userId} `;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};
