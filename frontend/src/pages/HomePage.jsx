import React, { useState, useEffect } from 'react';
// CORRECT IMPORT: We are importing our functions from the api/index.js file
import { fetchPosts, createPost } from '../api'; 
import Post from '../components/Post';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const user = localStorage.getItem('token');

  const getPosts = async () => {
    try {
      const { data } = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error("Could not fetch posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    try {
      // This function now correctly uses our API instance with the interceptor
      await createPost({ text: newPostText });
      setNewPostText('');
      getPosts(); // Refresh posts after creating a new one
    } catch (error) {
      // We keep the detailed error logging
      console.error('Failed to create post', error);
      if (error.response) {
        alert(`Error: ${error.response.data.msg || 'Could not create post.'}`);
      }
    }
  };

  return (
    <div className="home-container">
      {user ? (
        <div className="post-form-container">
          <h3>Create a new post</h3>
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="What's on your mind?"
              rows="3"
            ></textarea>
            <button type="submit">Post</button>
          </form>
        </div>
      ) : (
         <div className="login-prompt">
            <h2>Welcome to the Feed</h2>
            <p>Please log in or sign up to create a post.</p>
         </div>
      )}
      <div className="feed-container">
        <h2>Feed</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post._id} post={post} />
          ))
        ) : (
          <p>No posts yet. Be the first to create one!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;