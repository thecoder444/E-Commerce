const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productImage: {
        type: String,  // Cloudinary URL
        required: true
    },
    productImagePublicId: {
        type: String,  // Cloudinary public_id for deletion
        required: true
    },
    productStatus: {
        type: String,
        default: "Active"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);