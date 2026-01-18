const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Middleware to compress image with sharp
const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Compress and resize image
    const compressedImage = await sharp(req.file.buffer)
      .resize(500, 500, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 75, progressive: true })
      .toBuffer();

    req.file.buffer = compressedImage;
    req.file.mimetype = 'image/jpeg';
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload: upload.single('profileImage'),
  processImage
};
