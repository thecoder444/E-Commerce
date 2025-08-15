const mongoose = require("mongoose")
const {Schema, model} = mongoose

const orderSchema = new Schema({
    userId:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    orderId : String,
    paymentId : String,
    amount : Number,
    signature:  String,
    status: {type: String, default:"pending"},
    createAt : {type:Date, default:Date.now()}
})
module.exports = model("order", orderSchema)