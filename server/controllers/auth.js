const crypto = require('crypto');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc    Register user
// @router  POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Create User
  const user = await User.create({
    firstName,
    lastName,
    email,
    password
  });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token
  });
});

// @desc    Login user
// @router  POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token
  });
});
