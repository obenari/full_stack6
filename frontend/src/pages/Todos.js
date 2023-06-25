import React, { useState, useEffect } from "react";
import "../css/Todos.css";

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [sorting, setSorting] = useState("sequential");

  // useEffect(() => {
  //   const todos_item = localStorage.getItem("todos");
  //   if (todos_item) {
  //     setTodos(JSON.parse(todos_item));
  //   } else if (!user) return;
  //   else {
  //     fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`) //https://jsonplaceholder.typicode.com/users/1/todos
  //       .then((response) => response.json())
  //       .then((response) => {
  //         //response = response.filter((t) => t.userId === user.id);
  //         setTodos(response);
  //         localStorage.setItem("todos", JSON.stringify(response));
  //       });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   // const todos_item = localStorage.getItem("todos");
  //   // if (todos_item) {
  //   //   setTodos(JSON.parse(todos_item));
  //   // } else if (!user) return;
  //   // else {
  //     //fetch(`http://localhost:3001/users/${user.id}/todos`) //https://jsonplaceholder.typicode.com/users/1/todos
  //     fetch(`http://localhost:3001/users/1/todos`) //https://jsonplaceholder.typicode.com/users/1/todos
  //       .then((response) => {
  //         response.json();
  //         console.log(response);
  //       })
  //       .then((response) => {
  //         setTodos(response);
  //         localStorage.setItem("todos", JSON.stringify(response));
  //       })
  //       .catch((err) => console.log(err));
  //   //}
  // }, [user]);
  useEffect(() => {
    if(!user) return;
    async function fetchData() {
      let response = await fetch(`http://localhost:3001/users/${user.id}/todos`); //https://jsonplaceholder.typicode.com/users/1/todos
      let res = await response.json();

      setTodos(res);
      //localStorage.setItem("todos", JSON.stringify(res));
    }
    fetchData();
  }, [user]);

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  // const sortedTodos = todos.sort((a, b) => {
  //   switch (sorting) {
  //     case "sequential":
  //       return a.id - b.id;
  //     case "completed":
  //       return a.completed - b.completed;
  //     case "alphabetical":
  //       return a.title.localeCompare(b.title);
  //     case "random":
  //       return Math.random() - 0.5;
  //     default:
  //       return 0;
  //   }
  // });

  function handleCheckBoxChange(todo_id) {
    let copy_list = [];
    for (let e of todos) {
      copy_list.push({ ...e });
    }
    const index = copy_list.findIndex((t) => t.id === todo_id);
    copy_list[index].completed = !copy_list[index].completed;
    localStorage.setItem("todos", JSON.stringify(copy_list));
    setTodos(copy_list);
  }
  return (
    <div className="todos-container">
      <div className="sorting-container">
        <label htmlFor="sorting">Sort by:</label>
        <select id="sorting" value={sorting} onChange={handleSortingChange}>
          <option value="sequential">Sequential</option>
          <option value="completed">Completed</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
      </div>
      <hr></hr>
      <div className="todos-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item ">
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxChange(todo.id)}
              style={{ accentColor: "#cf3a6c" }}
              checked={todo.completed}
            />
            {todo.completed === true ? (
              <span>
                <s>{todo.title}</s>
              </span>
            ) : (
              <span>{todo.title}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;

// function Todos(){
//     return(
//         <div  className="content">
//             Todos
//         </div>
//     )
// }
