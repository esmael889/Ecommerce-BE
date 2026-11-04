import mongoose from "mongoose";
import { Schema } from "mongoose";

const SubCategorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[3,"SubCategory name must be at least 3 character length"]
    },
    slug:{
        type:String,
        lowercase:true
    },

    CategoryId:{
        type:Schema.ObjectId,
        ref:"Category"
    }
},{
    timestamps:true
})

export const SubCateogryModel=mongoose.model("SubCategory",SubCategorySchema)