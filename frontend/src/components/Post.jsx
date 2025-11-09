import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-author">{post.user?.name || 'Anonymous'}</span>
        <span className="post-date">{new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <p className="post-text">{post.text}</p>
    </div>
  );
};

export default Post;