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
const upload = multer({ dest: './public/posts/', storage, fileFilter });

const router = express.Router();

function fileFilter(req, file, cb) {
  const extension = file.mimetype.split('/')[0];
  console.log(extension);

  if (extension !== 'image') {
    return cb(new Error('Please upload only image file'), false);
  }
  cb(null, true);
}

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
