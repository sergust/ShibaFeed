const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const Post = require('../models/Post');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

dotenv.config({ path: './config/config.env' });

// @desc    Get all posts
// @router  GET /api/v1/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  if (!posts) {
    return next(new ErrorResponse(`Posts have not been found`, 404));
  }

  res.status(200).json({
    success: true,
    data: posts
  });
});

// @desc    Get signle post
// @router  Get /api/v1/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post ID ${req.params.id} has not been found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    Create new post
// @router  POST /api/v1/posts/
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  // Add user to req.body

  // Check for published post
  const publishedPost = await Post.findOne({
    title: req.body.title,
    description: req.body.description
  });

  if (publishedPost) {
    if (req.file) {
      fs.unlinkSync(
        `${process.env.FILE_UPLOAD_PATH}/${req.file.filename}`,
        () => {
          console.log(`${req.file.filename} has been deleted`.red);
        }
      );
    }

    return next(
      new ErrorResponse(
        `Post with these title and description is exists! Try to change the title or description`,
        400
      )
    );
  }

  // Add attached image
  if (req.file) {
    req.body.photo = req.file.filename;
  }

  // Create new post in database
  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    post
  });
});

// @desc    Update post
// @router  PUT /api/v1/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  //Take the post from db
  let post = await Post.findById(req.params.id);

  // Make sure post is exists
  if (!post) {
    return next(
      new ErrorResponse(`Post ID ${req.params.id} has not been found`, 404)
    );
  }

  // Check for published post
  const publishedPost = await Post.findOne({
    title: req.body.title,
    description: req.body.description
  });

  if (publishedPost) {
    if (req.file) {
      fs.unlinkSync(
        `${process.env.FILE_UPLOAD_PATH}/${req.file.filename}`,
        () => {
          console.log(`${req.file.filename} has been deleted`.red);
        }
      );
    }

    return next(
      new ErrorResponse(
        `Post with these title and description is exists! Try to change the title or description`,
        400
      )
    );
  }
  // Add attached image
  if (req.file) {
    req.body.photo = req.file.filename;
  }

  // Make sure user is post owner

  // Update the post in db
  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, post });
});

// @desc    Delete post
// @router  DELETE /api/v1/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  // Get the post from database
  const post = await Post.findById(req.params.id);

  // Make sure the post is exists
  if (!post) {
    return next(
      new ErrorResponse(`Post ID ${req.params.id} has not been found`, 404)
    );
  }

  // Make sure user is bootcamp owner

  // Make sure user is an admin

  // Remove the post from database
  post.remove();

  res.status(200).json({
    success: true,
    data: `The post ${req.params.id} has been sucessfully deleted!`
  });
});
