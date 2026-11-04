import mongoose, { Schema } from "mongoose";

const ReviewSchema=new Schema({
    Comment:{
        type:String,
        required:true,
        trim:true,
        minlength:[4,"Review must bea at least 4 characters length"]
    },
    product:{
        type:Schema.ObjectId,
        ref:"Product",
        required:true
    },

    user:{
        type:Schema.ObjectId,
        ref:"user",
        required:true
    },
    rate:{
        type:Number,
        enum:[1,2,3,4,5]
    }
},{timestamps:true});

ReviewSchema.pre(/^find/,function(){
    this.populate("user","name")
})

export const reviewModel=mongoose.model("Review",ReviewSchema);