const express = require('express');
// --- ADD NEW CONTROLLERS ---
const { createPost, getAllPosts, likePost, commentOnPost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', authMiddleware, createPost);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getAllPosts);

// --- NEW ROUTES ---
// @route   PUT api/posts/:id/like
// @desc    Like or unlike a post
// @access  Private
router.put('/:id/like', authMiddleware, likePost);

// @route   POST api/posts/:id/comment
// @desc    Add a comment to a post
// @access  Private
router.post('/:id/comment', authMiddleware, commentOnPost);
// --- END OF NEW ROUTES ---


module.exports = router;