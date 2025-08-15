const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        require :true,
    },
    cartItems:[],
    totalPrice:Number,
    totalQuantity : Number,
})
module.exports = mongoose.model("cart", cartSchema)