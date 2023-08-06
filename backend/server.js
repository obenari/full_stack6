const express = require("express");
const cors = require("cors");
//const bodyParser = require("body-parser");
const validateBody = require("./CheckBody");

const app = express();
app.use(express.json());
app.use(cors());
const db = require("./database");
const PORT = process.env.port || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});
app.get("/users/:id", (req, res) => {
  db.getUserInfo(req.params.id)
    .then((result) => {
      res.send(JSON.stringify(result[0]));
    })
    .catch((err) => console.log(err));
});
app.get("/validate_user", (req, res) => {
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
    })
    .catch((err) => console.log(err));
});
app.get("/users/:id/todos", (req, res) => {
  db.getTodos(req.params.id)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
});
app.get("/users/:id/posts", (req, res) => {
  db.getPosts(req.params.id)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
});
app.get("/users/posts/:postId/comments", (req, res) => {
  db.getComments(req.params.postId)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});

app.get("/*", (req, res) => {
  res.status(404);
});

app.post("/users/:userID/post", (req, res) => {
  console.log("post post");
  console.log(req.body);
  const { error } = validateBody.check("post", req.body);
  if (error) {
    console.log("post error params");
    res.status(400).send(error.details[0].message);
    return;
  }
  const { userId, title, body } = req.body;
  db.createPost(userId, title, body)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
});
app.delete("/users/:userId/post/:postId", (req, res) => {
  db.deletePost(req.params.postId)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => res.status(400).send("Failed to delete the post"));
});

app.put("/users/:userId/post/:postId}", (req, res) => {
  console.log("update post");
  console.log(req.body);
  const { error } = validateBody.check("post", req.body);
  if (error) {
    console.log("post error params");
    res.status(400).send(error.details[0].message);
    return;
  }
  db.updatePost(req.params.postId, req.body.title, req.body.body)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => res.status(400).send("Failed to delete the post"));
});
app.delete('/users/comments/:commentId',(req, res) => {
  db.deleteComment(req.params.commentId)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => res.status(400).send("Failed to delete the comment"));
})

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
