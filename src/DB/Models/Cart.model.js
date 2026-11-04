import mongoose from "mongoose";
import { Schema } from "mongoose";

const CartSchema=new Schema({
    user:{
        type:Schema.ObjectId,
        ref:"user"
    },
    cartItems:[
        {
            product:{ 
                type:Schema.ObjectId,
                ref:"Product"
                    },
                    Quantity:{
                        type:Number,
                        default:1
                    },
                    price:Number,
                    TotalProductDiscount:Number
        }
    ],
    TotalPrice:Number,
    PriceAfterDiscount:Number,
    Discount:Number
},{timestamps:true})


export const CartModel=mongoose.model("Cart",CartSchema);