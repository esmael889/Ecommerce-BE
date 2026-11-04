import mongoose, { Schema } from "mongoose";

const BrandSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[2,"Brand name must be at least 2 characters length"]
    },
    slug:{
        type:String,
        lowercase:true
    },
    logo:{
        secure_url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        },
    },

    SubCategoryId:{
        type:Schema.ObjectId,
        ref:"SubCategory"
    }
},{timestamps:true})

export const BrandModel=mongoose.model("Brand",BrandSchema)