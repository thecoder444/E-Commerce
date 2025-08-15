const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../middleware/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "ecommerce-products", // Cloudinary folder name
        allowed_formats: ["jpeg", "png", "jpg"],
        public_id: (req,file) => file.fieldname + "-" + Date.now()
    }
});

const upload = multer({
      storage:storage,
      limits: {fileSize: 1024 * 1024 * 5} //5mb
  })

module.exports = upload;
