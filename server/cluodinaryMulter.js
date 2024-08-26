const multer = require('multer');
const cloudinary = require('cloudinary');

// Configure cloudinary
cloudinary.config({
  cloud_name: 'free-lancer122',
  api_key: '875949998744219',
  api_secret: 'c-4Qz2ktoeVzvaVmt5w3ieAOYo4'
});

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });

// Export the cloudinary configuration and upload function
module.exports = {
  cloudinaryConfig: cloudinary,
  upload
};
