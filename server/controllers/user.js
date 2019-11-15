const dotenv = require('dotenv');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

dotenv.config({ path: './config/config.env' });

// @desc    Get all users
// @router  GET /api/v1/auth/users
// @access  Private/admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(new ErrorResponse(`Users have not been found`, 404));
  }

  res.status(200).json({
    success: true,
    data: users
  });
});

// @desc    Get signle user
// @router  Get /api/v1/auth/users:id
// @access  Private/admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User ID ${req.params.id} has not been found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Create new user
// @router  POST /api/v1/auth/users
// @access  Private/admin
exports.createUser = asyncHandler(async (req, res, next) => {
  // Add user to req.body

  // Check for existed user
  const existedUser = await User.findOne({
    email: req.body.email
  });

  if (existedUser) {
    return next(
      new ErrorResponse(`User with ${req.body.email} is already exists!`, 400)
    );
  }

  // Create new post in database
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @router  PUT /api/v1/auth/users:id
// @access  Private/admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  //Take the post from db
  let user = await User.findById(req.params.id);

  // Make sure post is exists
  if (!user) {
    return next(
      new ErrorResponse(`User ID ${req.params.id} has not been found`, 404)
    );
  }

  // Check for existed user
  const existedUser = await User.findOne({
    email: req.body.email
  });

  if (existedUser) {
    return next(
      new ErrorResponse(`User with ${req.body.email} is exists!`, 400)
    );
  }

  // Make sure user is post owner

  // Update the post in db
  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, user });
});

// @desc    Delete user
// @router  DELETE /api/v1/auth/users:id
// @access  Private/admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  // Get the post from database
  const user = await User.findById(req.params.id);

  // Make sure the User is exists
  if (!user) {
    return next(
      new ErrorResponse(`User ID ${req.params.id} has not been found`, 404)
    );
  }

  // Make sure user is bootcamp owner

  // Make sure user is an admin

  // Remove the post from database
  user.remove();

  res.status(200).json({
    success: true,
    data: `User ID ${req.params.id} has been sucessfully deleted!`
  });
});
