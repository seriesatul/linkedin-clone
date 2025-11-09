const mongoose = require('mongoose');

// Define a schema for comments first
const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  name: { type: String, required: true }, // Store the user's name for easy display
}, { timestamps: true });


const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  
  // --- NEW FIELDS ---
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // An array of user IDs who liked it
  ],
  comments: [CommentSchema], // An array of comment documents
  // --- END OF NEW FIELDS ---

}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);