import mongoose from "mongoose";
import { Schema } from "mongoose";

const CouponSchema=new Schema({
    code:{
        type:String,
        required:true,
        trim:true
    },
    expires:{
        type:Date,
        required:true
    },
    discount:{
        type:Number,
        min:0,
        required:true
    }
},{timestamps:true})

export const CouponModel=mongoose.model("Coupon",CouponSchema);
