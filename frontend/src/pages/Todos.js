import React, { useState, useEffect } from "react";
import "../css/Todos.css";
import { GET, PUT, POST, DELETE } from "../FetchRequest.js";
import { FaTrash, FaEdit} from 'react-icons/fa';


const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  //const [newTodoDescription, setNewTodoDescription] = useState("");
  const [showNewTodoForm, setShowNewTodoForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    completed: 0,
  });


  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const response = await GET(`/users/${user.id}/todos`);
        let json = await response.json();
        setTodos(json);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, [user]);

  const handleNewTodoClick = () => {
    setShowNewTodoForm(true);
  };

  const handleCloseNewTodoForm = () => {
    setNewTodoTitle("");
    setShowNewTodoForm(false);
  };

  const handleNewTodoSubmit = async (event) => {
    event.preventDefault();
    // Create a new todo object
    const newTodo = {
      userId: user.id,
      title: newTodoTitle,
      completed:0
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

  const handleDelete = async (todoId) => {
    try {
      let response=await DELETE(`/users/todos/${todoId}`, {
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

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    const numberCompleted = todo.completed ? 1: 0;
    setEditForm({
      id: todo.id,
      title: todo.title,
      completed: numberCompleted ,
    });
  };

  const handleSubmitTodoEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await PUT(
        `/users/todos/${editingTodo.id}`,
        editForm
      );
      if (!response.ok) {
        console.error("Failed to edit the todo.");
        return;
      }

      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, ...editForm } : todo
      );

      setTodos(updatedTodos);
      setEditingTodo(null);
      setEditForm({ id: "", title: "", completed:0 });
    } catch (error) {
      console.error("Error editing the todo:", error);
    }
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditForm({ id: "", title: "", completed:0 });
  };

  function handleCheckBoxChange(todo_id) {
    const updatedTodos = todos.map((todo) =>
    todo.id === todo_id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    const updatedTodo = updatedTodos.find((todo) => todo.id === todo_id);

    // Update the todo on the server
    const updateTodo = async () => {
      try {
        const response = await PUT(`/users/todos/${todo_id}`, {
          id:updatedTodo.id,title:updatedTodo.title,completed: updatedTodo.completed ? 1 : 0,
        });

        if (!response.ok) {
          console.error("Failed to update todo on the server.");
          // You might want to revert the state change if the server update fails
          // Here, you can set the state back to its previous state.
          setTodos(todos);
        }
      } catch (error) {
        console.error("Error updating todo on the server:", error);
        // Handle error, possibly by setting the state back to its previous state
        setTodos(todos);
      }
    };

    updateTodo();
  }

  const handleEditInputChange = (event) => {
    const {value} = event.target;
    setEditForm({
      id: editForm.id,
      title:value,
      completed:editForm.completed
    });
  };


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
                
            {editingTodo !== todo ? (

              <div>               
                <span
                  className={todo.completed ? "completed-title" : ""}
                  style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                >
                  {todo.title}
                </span>

                <button onClick={() => handleDelete(todo.id)}>
                  <FaTrash />
                </button>
                <button onClick={() => handleEdit(todo)}>
                  <FaEdit />
                </button>
              </div>
            ) : (
              <div className="comment-form">
                <form onSubmit={handleSubmitTodoEdit}>
                  <div>
                    <label>Title:</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.title}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <button type="submit">Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </form>
            </div>
          )}            
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Todos;
