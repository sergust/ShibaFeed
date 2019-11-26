const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Post = require('./models/Post');
const User = require('./models/User');
const Comment = require('./models/Comment');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
console.log('⏳ Reading data...');
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/posts.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Post.create(posts);
    console.log('✅ Data Imported!'.green);
    process.exit();
  } catch (e) {
    console.error('❌', e);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();
    await Comment.deleteMany();
    console.log('⚠️ All data has been destroyed!');
    process.exit();
  } catch (e) {
    console.error('❌', e);
  }
};

if (process.argv[2] === '-i') {
  console.log('⏳ Importing data...');
  importData();
} else if (process.argv[2] === '-d') {
  console.log('⏳ Destroying data...');
  deleteData();
}
