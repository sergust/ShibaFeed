const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts');
const uploadImage = require('../utils/uploadImage');

const router = express.Router();

router
  .route('/')
  .get(getPosts)
  .post(uploadImage.single('photo'), createPost);

router
  .route('/:id')
  .get(getPost)
  .put(uploadImage.single('photo'), updatePost)
  .delete(deletePost);

module.exports = router;
