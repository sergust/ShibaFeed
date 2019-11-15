const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add your first name'],
    trim: true,
    maxlength: [50, 'First name can not be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please add your last name'],
    trim: true,
    maxlength: [50, 'Last name can not be more than 50 characters']
  },
  avatar: {
    type: String,
    default: 'no-photo.jpg'
  },
  slug: String,
  role: {
    type: String,
    enum: ['user'],
    default: 'user'
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create user slug from the firstName and lastName
UserSchema.pre('save', function(next) {
  this.slug = slugify(this.firstName + this.lastName, { lower: true });
  next();
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
