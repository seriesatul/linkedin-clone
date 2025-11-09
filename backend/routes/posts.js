const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
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

module.exports = router;