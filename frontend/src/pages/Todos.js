import React, { useState, useEffect } from "react";
import "../css/Todos.css";
import { GET, PUT, POST, DELETE } from "../FetchRequest.js";

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  //const [newTodoDescription, setNewTodoDescription] = useState("");
  const [showNewTodoForm, setShowNewTodoForm] = useState(false);
  //const [editingTodoId, setEditingTodoId] = useState(null);
  //const [updatedTodoTitle, setUpdatedTodoTitle] = useState("");
  //const [updatedTodoDescription, setUpdatedTodoDescription] = useState("");


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

  const handleNewTodoClick = () => {
    setShowNewTodoForm(true);
  };

  const handleCloseNewTodoForm = () => {
    setShowNewTodoForm(false);
  };

  const handleNewTodoSubmit = async (event) => {
    event.preventDefault();
    // Create a new todo object
    const newTodo = {
      userId: user.id,
      title: newTodoTitle,
    };

    try {
      let response = await POST(`/users/todos/todo`, newTodo);
      if (!response.ok) {
        console.error("Failed to create new todoooo.");
        return;
      }
      // Fetch the updated list of posts
      let json = await response.json();
      const newTodo1 = { ...newTodo, id: json };
      setTodos([...todos, newTodo1]); // Add the new todo to the existing list of todos

      setNewTodoTitle("");
      setShowNewTodoForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error("Error creating new todo:", error);
    }
  };


  const handleDeleteTodo = async (todoId) => {
    try {
      let response=await DELETE(`/users/${user.id}/todos/${todoId}`, {
      });
      if(response.status!==200){
        console.log('failed to delete the todo');
        alert('failed to delete the todo')

      }
      else{
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
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

  <div>
    <div className="new-todo todo">
      {showNewTodoForm && (
        <button type="button cancel" onClick={handleCloseNewTodoForm}>
          X
        </button>
      )}
      {showNewTodoForm ? (
        <form onSubmit={handleNewTodoSubmit}>
          <label>
            New Todo Title:
            <input
              required
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
          </label>

          <button type="submit">Create New Todo</button>
        </form>
      ) : (
        <button className="new-todo-btn" onClick={handleNewTodoClick}>
          Create New Todo
        </button>
      )}
    </div>
    
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
  </div>
  );
};

export default Todos;
