const product = require("../models/product");
const productCollection = require("../models/product")
const queryCollection = require("../models/query")
const nodemailer = require("nodemailer")
const cloudinary = require("../middleware/cloudinary")
const upload = require("../middleware/multer")

const addadminproductController = async(req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);
        
        // Check if file uploaded
        if (!req.file) {
            return res.status(400).json({message: "Image is required"});
        }
        
        const { Pname, Price, Cat } = req.body;
        
        // Validation
        if (!Pname || !Price || !Cat) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        // Get Cloudinary data
        const imageUrl = req.file.path;       
        const imagePublicId = req.file.filename;
        
        console.log("Image URL:", imageUrl);
        console.log("Image Public ID:", imagePublicId);
        
        // Create product
        const record = new productCollection({
            productName: Pname,
            productPrice: Price,
            productCategory: Cat,
            productImage: imageUrl,              // Store Cloudinary URL
            productImagePublicId: imagePublicId  // Store for deletion
        });
        
        await record.save();
        
        console.log("Product saved successfully:", record);
        
        res.status(200).json({
            message: "Product inserted successfully",
            product: record
        });
        
    } catch (error) {
        console.error("Add product error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
const getAllProductsController = async(req,res) => {
    try {
        const record = await productCollection.find()
        res.status(200).json({data:record})
        console.log(record)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
const deleteProductController = async(req,res) => {
   try {
    const id = req.params.id;
    await productCollection.findByIdAndDelete(id)
    res.status(200).json({message:"Deleted Successfully"}) 
   } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
   }
}
const editvaluedataController = async(req,res)=>{
    try {
        const id = req.params.abc
        const record = await productCollection.findById(id)
        res.status(200).json({data:record})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
const updateproductController = async(req,res) => {
    try {
        const {Pname, Pprice, Cat, Pstatus} = req.body;
        console.log(req.body)
        const id = req.params.abc;
        await productCollection.findByIdAndUpdate(id,{
            productName: Pname,
            productPrice: Pprice,
            productCategory: Cat,
            productStatus: Pstatus,
        })
        res.status(200).json({message:"Update Successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }

}
const userAllQuery = async(req,res) => {
    try {
        const record = await queryCollection.find();
        res.status(200).json({data:record})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
const deletequeryController = async(req,res)=>{
    try {
        const id = req.params.abc;
        await queryCollection.findByIdAndDelete(id)
        res.status(200).json({message:"Deleted Successfully"}) 
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
const singleQueryController = async(req,res) => {
    try {
        const id = req.params.id;
        const record = await queryCollection.findById(id)
        res.status(200).json({data:record})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

const mailReplyController = async(req,res) => {
   try {
     const {to, sub, body} = req.body
     const id = req.params.abc;
     const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS,
         },
       });
       
         const info = transporter.sendMail({
           from: '"Quickzy" <pcmail2223@gmail.com>',
           to : to,
           subject : sub,
           text: body, // plain‑text body
           html: body, // HTML body
         });
         await queryCollection.findByIdAndUpdate(id,{
            QueryStatus:"Read",
         })
         res.status(200).json({message:"Reply Successfully"}) 
   } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
   }
}

module.exports = {
    addadminproductController,
     getAllProductsController,
     deleteProductController,
    editvaluedataController,
    updateproductController,
    userAllQuery,
    deletequeryController,
    singleQueryController,
    mailReplyController
    }