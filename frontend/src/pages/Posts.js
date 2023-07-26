import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Posts.css";

function Posts({ user }) {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  console.log(postId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      try {
        //fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`) //https://jsonplaceholder.typicode.com/users/1/posts
        let response = await fetch(
          `http://localhost:3001/users/${user.id}/posts`
        );
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
      let response = await fetch(
        `http://localhost:3001/users/posts/${postId}/comments`
      );
      let json = await response.json();
      setComments(json);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleCloseCommentsClick = (postId) => {
    setSelectedPostId(null);
  };
  const handlePostClick = (postId) => {
    //console.log("postId:", postId);
    navigate(`/users/${user?.name}/Posts/${postId}`);
  };

  return (
    <div>
      <div className="posts-container">
        {posts.map((post) => (
          <div
            onClick={() => handlePostClick(post.id)}
            key={post.id}
            className={postId == post.id ? "selected-post post" : "post"}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {selectedPostId === post.id ? (
              <div>
                <h4>Comments:</h4>
                {comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>"Name: " {comment.name}</p>
                    <p>"Email: " {comment.email}</p>
                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {selectedPostId === post.id ? (
              <button onClick={() => handleCloseCommentsClick(post.id)}>
                Close Comments
              </button>
            ) : (
              <button onClick={() => handleCommentsClick(post.id)}>
                View Comments
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;

// function Posts(){
//     return(
//         <div  className="content">
//             Posts
//         </div>
//     )
// }

// export default Posts;
