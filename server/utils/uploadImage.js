const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config({ path: '../config/config.env' });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, process.env.FILE_UPLOAD_PATH);
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
});

function fileFilter(req, file, cb) {
  const extension = file.mimetype.split('/')[0];
  console.log(extension);

  if (extension !== 'image') {
    return cb(new Error('Please upload only image file'), false);
  }
  cb(null, true);
}

const uploadImage = multer({ dest: './public/posts/', storage, fileFilter });

module.exports = uploadImage;
