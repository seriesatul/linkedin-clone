const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Create a post
exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      text: req.body.text,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user', ['name']);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Like or unlike a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.likes.some((like) => like.equals(req.user.id))) {
      // User has already liked, so remove the like
      post.likes = post.likes.filter((like) => !like.equals(req.user.id));
    } else {
      // User has not liked, so add the like
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a comment to a post
exports.commentOnPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};