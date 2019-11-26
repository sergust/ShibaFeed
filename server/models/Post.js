const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema(
  {
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Cascade delete comments when a post is deleted
PostSchema.pre('remove', async function(next) {
  console.log(`Comments being removed from post ${this._id}`);
  await this.model('Comment').deleteMany({ post: this._id });
  next();
});

// Create post slug from the title
PostSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Reverse populate with virtuals
PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  justOne: false
});

module.exports = mongoose.model('Post', PostSchema);
