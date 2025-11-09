import React, { useState } from 'react';
import { likePost, commentOnPost } from '../api';
import { jwtDecode } from 'jwt-decode';

const Post = ({ post, onUpdate }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const token = localStorage.getItem('token');
  const currentUser = token ? jwtDecode(token).user : null;

  const handleLike = async () => {
    if (!currentUser) return alert('Please log in to like a post.');
    await likePost(post._id);
    onUpdate();
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert('Please log in to comment.');
    if (!commentText.trim()) return;
    await commentOnPost(post._id, { text: commentText });
    setCommentText('');
    onUpdate();
  };

  const hasLiked = currentUser ? post.likes.includes(currentUser.id) : false;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center mb-4">
        {/* Placeholder for profile pic */}
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
        <div>
          <p className="font-semibold text-gray-800">{post.user?.name || 'Anonymous'}</p>
          <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{post.text}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
        <span>{post.likes.length} Likes</span>
        <span>{post.comments.length} Comments</span>
      </div>

      <div className="border-t border-gray-200 pt-2">
        <div className="flex space-x-4">
          <button onClick={handleLike} className={`flex-1 text-center py-2 rounded-md ${hasLiked ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>
            Like
          </button>
          <button onClick={() => setShowComments(!showComments)} className="flex-1 text-center py-2 rounded-md text-gray-600 hover:bg-gray-100">
            Comment
          </button>
        </div>
      </div>

      {showComments && (
        <div className="mt-4">
          {currentUser && (
            <form onSubmit={handleCommentSubmit} className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-grow p-2 border rounded-full focus:ring focus:ring-blue-200"
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-full">Post</button>
            </form>
          )}
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment._id} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold text-sm">{comment.name}</p>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;