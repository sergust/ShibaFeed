const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
    maxlength: [500, 'Descriptiom can not be more than 500 characters']
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  slug: String,
  //   user: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'User',
  //     required: true
  //   },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create post slug from the title
PostSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Post', PostSchema);