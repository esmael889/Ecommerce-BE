import mongoose, { Schema } from "mongoose";


const CategorySchema=new Schema({
    name:{
        type:String,
        required:[true,"Category name must be listed"],
        minlength:[3,"category length must be at least 3 characters length"],
        trim:true,
        unique:[true,"Cant repeat Category name"]
    },
    slug:{
        type:String,
        lowercase:true,
        trim:true
    },

    image:{
        secure_url:{
            type:String,
            requird:true
        },
        public_id:{
            type:String,
            requird:true
        },
    }
},{timestamps:true})

export const CategoryModel=mongoose.model("Category",CategorySchema)