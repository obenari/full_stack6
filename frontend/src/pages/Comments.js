import React, { useState, useEffect } from "react";
import { GET, DELETE, POST } from "../FetchRequest.js";
import "../css/Comments.css";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET(`/users/posts/${postId}/comments`);

        let json = await response.json();
        setComments(json);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      let response = await DELETE(`/users/comments/${id}`);
      if (!response.ok) {
        console.error("Failed to delete the comment.");
        return;
      }
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  const handleCommentAdd = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to the server's API endpoint to add the new comment
      const response = await POST(
        `/users/posts/${postId}/comments`,
        newComment
      );

      if (!response.ok) {
        console.error("Failed to add the comment.");
        return;
      }
      let newID = await response.json();
      const newComment1 = { ...newComment, id: newID };
      setComments([...comments, newComment1]); // Add the new post to the existing list of posts
      setNewComment({
        name: "",
        email: "",
        body: "",
      });
      setShowForm(false); // Close the form after adding the comment
    } catch (error) {
      console.error("Error adding the comment:", error);
    }
  };
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };
  return (
    <div>
      <h4>Comments:</h4>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>"Name: " {comment.name}</p>
          <p>"Email: " {comment.email}</p>
          <p>{comment.body}</p>
          <button onClick={() => handleDelete(comment.id)}>Delete</button>
        </div>
      ))}
      <div>
      
        <button onClick={toggleFormVisibility}>
          {showForm ? "Hide Form" : "Add Comment"}
        </button>
        {showForm && (
          <div className="comment-form">
            <h4>Add a Comment:</h4>
            <form onSubmit={handleCommentAdd}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newComment.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newComment.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Comment:</label>
                <textarea
                  name="body"
                  value={newComment.body}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Add Comment</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
