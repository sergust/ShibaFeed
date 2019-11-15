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

  res.status(200).json({
    success: true
  });
});
