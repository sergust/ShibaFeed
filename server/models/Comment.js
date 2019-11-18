const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  commentBody: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
    maxlength: [500, 'Descriptiom can not be more than 500 characters']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
