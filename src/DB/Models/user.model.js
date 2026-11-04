import mongoose, { Schema } from "mongoose";
import { RolesTypes } from "../../middleWares/authuntication.middle.js";


const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"userName must be at least 3 characters length"],
        maxlength:[30,"userName must be at Most 3 characters length"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,"email must be a valid email format"],
        lowerCase:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"password must be at least 8 character length"],
    },

    gender:{
        type:String,
        enum:{
            values:["male","female"],
            message:"user gender must be male or female only",
            default:"male"
        },
    },

    ConfirmEmail:{
    type:Boolean,
    default:false
    },

    role:{
        type:String,
        enum:{
            values:Object.values(RolesTypes),
            default:"user",
            message:"role must be user or admin"
        },
    },

     token:String,

    Address:[
        {
            city:String,
            street:String,
            phone:String
        }
    ],
    phone:String,

    image:{
        secure_url:{
            type:String,
            // required:true
        },
        public_id:{
            type:String,
            // required:true
        }
    }

,
    WishLists:[{
        type:Schema.ObjectId,
        ref:"Product"
    }]
},{
    timestamps:true
})


export const userModel=mongoose.model("user",userSchema)