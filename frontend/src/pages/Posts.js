import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Posts.css";
import { GET, PUT, POST, DELETE } from "../FetchRequest.js";
import Comments from "./Comments";
function Posts({ user }) {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [updatedPostTitle, setUpdatedPostTitle] = useState("");
  const [updatedPostBody, setUpdatedPostBody] = useState("");

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      try {
        const response = await GET(`/users/${user.id}/posts`);

        let json = await response.json();
        setPosts(json);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchData();
  }, [user]);

  const handleCommentsClick = async (postId) => {
    try {
      setSelectedPostId(postId);

      // const response = await GET(`/users/posts/${postId}/comments`);

      // let json = await response.json();
      // setComments(json);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCloseCommentsClick = () => {
    setSelectedPostId(null);
  };

  const handlePostClick = (postId) => {
    try {
      navigate(`/users/${user.name}/Posts/${postId}`);
    } catch {
      navigate(`/users/user/Posts/${postId}`);
    }
  };

  const handleNewPostClick = () => {
    setShowNewPostForm(true);
  };

  const handleCloseNewPostForm = () => {
    setShowNewPostForm(false);
  };
  const handleNewPostSubmit = async (event) => {
    event.preventDefault();

    // Create a new post object
    const newPost = {
      userId: user.id,
      title: newPostTitle,
      body: newPostBody,
    };

    try {
      let response = await POST(`/users/${user.id}/post`, newPost);

      if (!response.ok) {
        console.error("Failed to create new post.");
        return;
      }

      // Fetch the updated list of posts
      let json = await response.json();
      const newPost1 = { ...newPost, id: json };
      setPosts([...posts, newPost1]); // Add the new post to the existing list of posts

      setNewPostTitle("");
      setNewPostBody("");
      setShowNewPostForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      const response = await DELETE(`/users/${user.id}/post/${postId}`);
      if (!response.ok) {
        console.error("Failed to delete the post.");
        return;
      }
      setPosts(posts.filter((post) => post.id !== postId));
      setSelectedPostId(-1);
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };
  const handleEditPostClick = (postId, postTitle, postBody) => {
    setEditingPostId(postId);
    setUpdatedPostTitle(postTitle);
    setUpdatedPostBody(postBody);
  };
  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  const handleUpdatePostSubmit = async (event) => {
    event.preventDefault();
    const updatedPost = {
      userId: user.id,
      title: updatedPostTitle,
      body: updatedPostBody,
    };
    try {
      let response = await PUT(
        `/users/${user.id}/post/${editingPostId}`,
        //`/users/${user.id}/post/${postId}`,
        updatedPost
      );

      if (!response.ok) {
        console.error("Failed to update the post.");
        return;
      }

      // Fetch the updated list of posts
      // let json = await response.json();
      setPosts(
        posts.map((post) =>
          post.id === editingPostId
            ? { ...updatedPost, id: editingPostId }
            : post
        )
      );
      setEditingPostId(null); // Reset the editing state
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  return (
    <div>
      <div className="new-post post">
        {showNewPostForm && (
          <button type="button cancel" onClick={handleCloseNewPostForm}>
            X
          </button>
        )}
        {showNewPostForm ? (
          <form onSubmit={handleNewPostSubmit}>
            <label>
              New Post Title:
              <input
                required
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
            </label>
            <label>New Post Body: </label>
            <textarea
              required
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
            />

            <button type="submit">Create New Post</button>
          </form>
        ) : (
          <button className="new-post-btn" onClick={handleNewPostClick}>
            Create New Post
          </button>
        )}
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <div
            onClick={() => handlePostClick(post.id)}
            key={post.id}
            className={postId == post.id ? "selected-post post" : "post"}
          >
            {editingPostId !== post.id && (
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            )}
            {selectedPostId === post.id ? (
              <Comments postId={selectedPostId} />
            ) : null}
            {selectedPostId === post.id ? (
              <button onClick={handleCloseCommentsClick}>Close Comments</button>
            ) : (
              <button onClick={() => handleCommentsClick(post.id)}>
                View Comments
              </button>
            )}
            {editingPostId === post.id ? (
              <form onSubmit={handleUpdatePostSubmit}>
                <label>
                  Post Title:
                  <input
                    required
                    type="text"
                    className="update"
                    value={updatedPostTitle}
                    onChange={(e) => setUpdatedPostTitle(e.target.value)}
                  />
                </label>
                <label> Post Body: </label>
                <textarea
                  required
                  className="update text-area"
                  value={updatedPostBody}
                  onChange={(e) => setUpdatedPostBody(e.target.value)}
                />

                <button type="submit">Update Post</button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <button
                  onClick={() =>
                    handleEditPostClick(post.id, post.title, post.body)
                  }
                >
                  Edit Post
                </button>
                <button onClick={() => handleDeletePost(post.id)}>
                  Delete Post
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;

/*<div>
                <h4>Comments:</h4>
                {comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>"Name: " {comment.name}</p>
                    <p>"Email: " {comment.email}</p>
                    <p>{comment.body}</p>
                  </div>
                ))}
                </div>*/
