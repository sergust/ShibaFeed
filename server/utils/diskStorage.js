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

module.exports = storage;
