const express = require("express");
const cors = require("cors");
//const bodyParser = require("body-parser");
const validateBody = require("./CheckBody");

const app = express();
app.use(express.json());
app.use(cors());
const db = require("./database");
const PORT = process.env.port || 3001;


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


app.get("/*", (req, res) => {
  res.status(404);
});

//posts

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

app.put("/users/:userId/post/:postId", (req, res) => {
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
    .catch((err) => res.status(400).send("Failed to update the post"));
});

//users
app.post("/users/new_user", (req, res) => {
  console.log("post new user");
  console.log(req.body);
  const { error } = validateBody.check("user", req.body);
  if (error) {
    console.log("post error params");
    res.status(400).send(error.details[0].message);
    return;
  }
  const { name, username, password, email, phone, website, rank, api_key } =
    req.body;
  db.createUser(name, username, password, email, phone, website, rank, api_key)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
});


//comments
app.delete("/users/comments/:commentId", (req, res) => {
  db.deleteComment(req.params.commentId)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => res.status(400).send("Failed to delete the comment"));
});

app.post("/users/posts/:postId/comments", (req, res) => {
  console.log("post new comment");
  console.log(req.body);
  const { error } = validateBody.check("comment", req.body);
  if (error) {
    console.log("comment error params");
    res.status(400).send(error.details[0].message);
    return;
  }
  const { postId, name, email, body } = req.body;
  db.createComment(postId, name, email, body)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
});

app.put("/users/comments/:commentId", (req, res) => {
  console.log("update comment");
  console.log(req.body);
  const { error } = validateBody.check("updateComment", req.body);
  if (error) {
    console.log("comment error params");
    res.status(400).send(error.details[0].message);
    return;
  }
  db.updateComment(req.body.id, req.body.name, req.body.email, req.body.body)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => res.status(400).send("Failed to update the comment"));
});
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

//todos
app.delete("/users/todos/:todoId", (req, res) => {
  db.deleteTodo(req.params.todoId)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => res.status(400).send("Failed to delete the post"));
});

app.post("/users/todos/todo", (req, res) => {
  console.log("post todo");
  console.log(req.body);
  const { error } = validateBody.check("todo", req.body);
  if (error) {
    console.log("todo error params");
    res.status(400).send(error.details[0].message);
    return;
  }
  const {title} = req.body;
  const {completed}=false;
  alert(title+" "+completed);
  db.createTodo(title, completed)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
});