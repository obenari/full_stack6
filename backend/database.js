var mysql = require("mysql2");
const connectionInfo = require("./connectionInfo").connectionInfo;

var con = mysql.createConnection(connectionInfo);


//#region todos
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

exports.updateTodo = function (todoId, newTitle, completed) {
  return new Promise((resolve, reject) => {
    let query = `UPDATE FullStackProject6.todos SET title='${newTitle}', completed='${completed}' WHERE id=${todoId}`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

exports.createTodo = function (newTitle, completed) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO FullStackProject6.todos (title, completed) VALUES ('${newTitle}', '${completed}')`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};


exports.deleteTodo = function(todoId) {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM FullStackProject6.todos WHERE id=${todoId}`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};
//#endregion
//#region users
exports.getUserInfo = function (userId) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users WHERE id=${userId} `;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("2:Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

/*exports.deleteUserInfo = function (userId) {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM users WHERE id=${userId};
                 DELETE FROM todos WHERE userId=${userId};
                 DELETE FROM comments WHERE postId in 'SELECT postId FROM posts WHERE userId =${userId}'
                 DELETE FROM posts WHERE userId = ${userId}`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

exports.postUser = function (name, username, email, phone, website, rank, api_key) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO users (name, username, email, phone, website, rank, api_key) VALUES ('${name}', '${username}', '${email}', '${phone}', '${website}', '${rank}', '${api_key}')`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

exports.updateUser = function (userId, name, username, email, phone, website, rank, api_key) {
  return new Promise((resolve, reject) => {
    let query = `UPDATE users SET name='${name}', username='${username}', email='${email}', phone='${phone}', website='${website}', rank='${rank}', api_key='${api_key}' WHERE id=${userId}`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};*/


exports.getAllUsers = function () {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM passwords `;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("1:Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};
//#endregion
//#region posts
exports.getPosts = function (userId) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM posts WHERE userId=${userId} `;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

exports.createPost = function (userId, title, body) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO posts (userId, title, body) VALUES (${userId}, '${title}', '${body}')`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

exports.updatePost = function (postId, title, body) {
  return new Promise((resolve, reject) => {
    let query = `UPDATE posts SET title='${title}', body='${body}' WHERE id=${postId}`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

exports.deletePost = function (postId) {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM comments WHERE postId=${postId};
                  DELETE FROM posts WHERE id=${postId}`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

//#endregion
//#region comments
exports.getComments = function (postId) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM comments WHERE postId=${postId} `;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

exports.createComment = function (postId, name, email, body) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO comments (postId, name, email, body) VALUES (${postId}, '${name}', '${email}', '${body}')`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

exports.updateComment = function (commentId, name, email, body) {
  return new Promise((resolve, reject) => {
    let query = `UPDATE comments SET name='${name}', email='${email}', body='${body}' WHERE id=${commentId}`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};

exports.deleteComment = function (commentId) {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM comments WHERE id=${commentId}`;
    con.query(query, (error, results, fields) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }

      resolve(results);
    });
  });
};



//#endregion