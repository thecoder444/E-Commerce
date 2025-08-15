const userCollection = require("../models/user")
const bcrypt = require("bcrypt")
const productCollection = require("../models/product")
const queryCollection = require("../models/query")
const cartCollection = require("../models/cart")
const jwt = require("jsonwebtoken")
const RazorPay = require("razorpay")
const crypto = require("crypto")
const orderCollection = require("../models/order")

const razorPay = new RazorPay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
}) 

const orderController = async(req,res) => {

    const {amount, currency, receipt} = req.body
    const options = {
        amount:amount*100,
        currency,
        receipt
    }
    try {
        const order = await razorPay.orders.create(options)
        res.json(order)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

const verifyController = async(req,res) => {
const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, userId } = req.body;

const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
const generated_signature = hmac.digest("hex");

if (generated_signature === razorpay_signature) {

    const record = new orderCollection({
        userId : userId,
        orderId : razorpay_order_id,
        paymentId : razorpay_payment_id,
        signature : razorpay_signature,
        amount : amount,
        status: "Paid",
    })
    await record.save();

    res.json({ success: true, message: "Payment verification successful" });
} else {
    res.json({ success: false, message: "Payment verification failed" });
}
}

const regDataController = async(req,res) => {
    try {
        const {fname, email, pass} = (req.body)
    if(!fname || !email || !pass){
       return res.status(400).json({message:"All fields are required"})
    }
    const emailExists = await userCollection.findOne({userEmail:email})
    if(emailExists){
        return res.status(400).json({message:"Email already registered"})
    }

    const hashPassword = await bcrypt.hash(pass, 10)
    const record = new userCollection({
        userName:fname,
        userEmail:email,
        userPass:hashPassword
    })
    await record.save();
    res.status(200).json({message:"Registered Successfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}
    const loginDataController = async(req,res) => {
        // console.log(req.body)
       try {
        const {loginEmail, loginPass} = (req.body)
        const userCheck = await userCollection.findOne({userEmail:loginEmail})
        if(!userCheck){
            return res.status(400).json({message:"User Not Found"})
        }
        const matchPass = await bcrypt.compare(loginPass, userCheck.userPass)
        if(!matchPass){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({
            id:userCheck._id,
        },process.env.JWT_SECRET,{expiresIn:"1h"})

        res.status(200).json({message:"Successfully Login 😍",data:userCheck, token:token})
       } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
       }  
    }

    const userAllProducts = async(req,res) => {
        try {
            const category = req.query.category;
            let filter  = ({productStatus : "in stock"})
            if(category && category.toLowerCase() != "all"){
                filter.productCategory = category.toLowerCase();
            }

            const record = await productCollection.find(filter)
            res.status(200).json({data:record})
        } catch (error) {
            res.status(500).json({message:"Internal Server Error"})
        }
    }

    const userQueryController = async(req,res)=>{
        try {
            const {userName, userEmail, userQuery} = req.body;
            const record  = new queryCollection({
                Name: userName,
                Email: userEmail,
                Query: userQuery,
                
            })
            await record.save();
            res.status(200).json({message:"Query Submitted✅"})
        } catch (error) {
            res.status(500).json({message:"Internal Server Error"})
        }
    }
const saveCartController = async(req,res) => {
    try {   
        const {userId, cartItems, totalPrice, totalQuantity} = req.body;
    let cart = await cartCollection.findOne({userId})
    if(cart){
        cart.cartItems = cartItems,
        cart.totalPrice = totalPrice,
        cart.totalQuantity = totalQuantity
        await cart.save();
    }else{
        cart = new cartCollection({
            userId,
            cartItems,
            totalPrice,
            totalQuantity
        })
    }
    await cart.save();
    res.status(200).json({message:"Cart saved succesfully✅"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
const getCartController = async(req,res) => {
    try {
        const userId = req.params.userId;
        const cart = await cartCollection.findOne({userId})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }

}
const searchController = async(req,res) => {
    try {
        const keyword = req.query.q;
        const result = await productCollection.find({
            productName: {$regex:keyword, $options:"i"},
            productStatus: "in stock"
        })
        res.status(200).json({data:result})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }    
}


module.exports={
    regDataController,
    loginDataController,
    userAllProducts,
    userQueryController,
    saveCartController,
    getCartController,
    searchController,
    orderController,
    verifyController
}