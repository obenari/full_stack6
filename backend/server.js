// var http = require("http");
// http
//   .createServer(function (req, res) {
//     console.log("fdghdif");
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("Hello World!iiiiiiiii");
//   })
//   .listen(8081);
const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
