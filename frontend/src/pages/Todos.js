import React, { useState, useEffect } from "react";
import "../css/Todos.css";
import { GET, PUT, POST, DELETE } from "../FetchRequest.js";

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  // const [sorting, setSorting] = useState("sequential");

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      let response = await fetch(
        `http://localhost:3001/users/${user.id}/todos`
      ); //https://jsonplaceholder.typicode.com/users/1/todos
      let res = await response.json();

      setTodos(res);
    }
    fetchData();
  }, [user]);
  const handleDeleteTodo = async (todo_id) => {
    try {
      let response=await DELETE(`/todos/${todo_id}`, {
      });
      if(response.status!==200){
        console.log('failed to delet the todo');
        alert('failed to delet the todo')

      }
      else{
      const updatedTodos = todos.filter((todo) => todo.id !== todo_id);
      setTodos(updatedTodos);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // const handleSortingChange = (e) => {
  //   setSorting(e.target.value);
  // };

  function handleCheckBoxChange(todo_id) {
    let copy_list = [];
    for (let e of todos) {
      copy_list.push({ ...e });
    }
    const index = copy_list.findIndex((t) => t.id === todo_id);
    copy_list[index].completed = !copy_list[index].completed;
    //localStorage.setItem("todos", JSON.stringify(copy_list));
    setTodos(copy_list);
  }
  return (
    <div className="todos-container">
      <div className="sorting-container"></div>
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
            <button onClick={(e) => handleDeleteTodo(todo.id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
