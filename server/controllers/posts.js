//const Posts = require('../models/Posts');
const asyncHandler = require('../middleware/async');

const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all posts
// @router  GET /api/v1/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'posts'
  });
});

// @desc    Get signle post
// @router  Get /api/v1/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: `Post ID ${req.params.id}`
  });
});

// @desc    Create new post
// @router  POST /api/v1/posts/
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  // Add user to req.body

  // Check for published post

  // Create new post in database
  const data = req.body;

  res.status(201).json({
    success: true,
    data
  });
});

// @desc    Update post
// @router  PUT /api/v1/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  const data = req.body;
  //Take the post from db

  // Make sure post is exists

  // Make sure user is bootcamp owner

  // Update the post in db

  res.status(200).json({ success: true, data });
});

// @desc    Delete post
// @router  DELETE /api/v1/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  // Get the post from database

  // Make sute the post is exists

  // Make sure user is bootcamp owner

  // Make sure user is an admin

  // Remove the post from database

  res.status(200).json({
    success: true,
    data: `The post ${req.params.id} has been sucessfully deleted!`
  });
});
