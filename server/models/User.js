const mongoose = require('mongoose');
const slugify = require('slugify');

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

module.exports = mongoose.model('User', UserSchema);
