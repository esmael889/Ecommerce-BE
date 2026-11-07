import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema=new Schema({
    user:{
        type:Schema.ObjectId,
        ref:"user",
        required:true
    },
    cartItems:[
        {
            product:{ 
                type:Schema.ObjectId,
                ref:"Product",
                required:true
                    },
                    Quantity:Number,
                    price:Number
        }
    ],
    TotalOrderPrice:Number,
    shippingAddress:{
        street:String,
        City:String,
        phone:String
    },
    paymentMethod:{
        type:String,
        enum:["card","cash"],
        default:"cash"
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDelivered:{
        type:Boolean,
        default:false
    },
stripeSessionId: {
    type: String,
    unique: true,
    sparse: true
},
    deliveredAt:Date
},{timestamps:true})


export const OrderModel=mongoose.model("Order",OrderSchema);