// var http = require("http");
// http
//   .createServer(function (req, res) {
//     console.log("fdghdif");
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("Hello World!iiiiiiiii");
//   })
//   .listen(8081);
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const db = require("./database");
const PORT = process.env.port || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});
app.get("/users/:id", (req, res) => {
  //https://jsonplaceholder.typicode.com/users/1/todos
  db.getUserInfo(req.params.id)
    .then((result) => {
      //console.log("11" + result);
      res.send(JSON.stringify(result[0]));
      //res.send(result);
    })
    .catch((err) => console.log(err));
});
app.get("/validate_user", (req, res) => {
  //https://jsonplaceholder.typicode.com/users/1/todos
  db.getAllUsers()
    .then((result) => {
      let succes = result.find(
        (user) =>
          user.username === req.query.username &&
          user.password === req.query.password
      );
      if (!succes) {
        res.status(404);
        res.send(JSON.stringify("wrong username or password"));
      } else {
        res.status(200);
        res.send(JSON.stringify(succes.id));
      }
      //console.log("11" + result);
      // res.send(JSON.stringify(result));
      //res.send(result); f
    })
    .catch((err) => console.log(err));
});
app.get("/users/:id/todos", (req, res) => {
  //https://jsonplaceholder.typicode.com/users/1/todos
  db.getTodos(req.params.id)
    .then((result) => {
      //console.log("11" + result);
      res.send(JSON.stringify(result));
      //res.send(result);
    })
    .catch((err) => console.log(err));
});
app.get("/users/:id/posts", (req, res) => {
  db.getPosts(req.params.id)
    .then((result) => {
      //console.log("11" + result);
      res.send(JSON.stringify(result));
      //res.send(result);
    })
    .catch((err) => console.log(err));
});
app.get("/users/posts/:postId/comments", (req, res) => {
  db.getComments(req.params.postId)
    .then((result) => {
      //console.log("11" + result);
      res.send(JSON.stringify(result));
      //res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});

// app.get("/users/:id", (req, res) => {
//   //https://jsonplaceholder.typicode.com/users/1/todos
//   let result = db
//     .executeQuery(
//       `SELECT * FROM FullStackProject6.todos WHERE userId=${req.params.id}`
//     )
//     .then((result) => {
//       console.log("11" + result);
//       res.send(
//         "toods!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" +
//           req.params.id +
//           JSON.stringify(result)
//       );
//     });
//   //if (!result)
// });

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});

app.get("/*", (req, res) => {
  res.status(404);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
