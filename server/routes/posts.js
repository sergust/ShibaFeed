const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts');
const multer = require('multer');
const storage = require('../utils/diskStorage');
const upload = multer({ dest: './public/posts/', storage });

const router = express.Router();

router
  .route('/')
  .get(getPosts)
  .post(upload.single('photo'), createPost);

router
  .route('/:id')
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
