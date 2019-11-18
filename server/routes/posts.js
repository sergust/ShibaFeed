const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
  updateComment
} = require('../controllers/posts');
const { protect } = require('../middleware/auth');
const uploadImage = require('../utils/uploadImage');

const router = express.Router();

router
  .route('/')
  .get(getPosts)
  .post(protect, uploadImage.single('photo'), createPost);

router
  .route('/:id')
  .get(getPost)
  .put(protect, uploadImage.single('photo'), updatePost)
  .delete(protect, deletePost);

router.post('/:id/comments/addcomment', protect, addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);
router.put('/:id/comments/:commentId', protect, updateComment);

module.exports = router;
