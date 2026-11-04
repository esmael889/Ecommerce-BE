
import mongoose, { Schema } from "mongoose";

const productSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[3,"product name must be at least 3 characters length"]
    },
    slug:{
        type:String,
        lowercase:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:[10,"too short description"]
    },
    price:{
        type:Number,
        min:0,
        default:0
    },
    amountOfDiscount:{
        type:Number,
        default:0
    },
    priceAfterDiscount:{
        type:Number,
        default:1
    },
    stock:{
        type:Number,
        min:0,
        default:0
    },
    sold:{
        type:Number,
        min:0,
        default:0
    },

    Quantity:{
        type:Number,
        default:0,
        min:0,
        required:true
    },
    imageCover:{
        secure_url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },

    Images:[{
            secure_url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    }],
    PublicIds:[{
        public_id:{
            type:String,
            required:true
        }
    }],
    categoryId:{
        type:Schema.ObjectId,
        ref:"Category"
    },
    SubcategoryId:{
        type:Schema.ObjectId,
        ref:"SubCategory"
    },
    BrandId:{
        type:Schema.ObjectId,
        ref:"Brand"
    },
    RatingAvg:{
        type:Number,
        min:1,
        max:5
    },
    RatingCount:{
        type:Number,
        min:0
    },
    colors:{
        type:[String]
    },
    Size:{
        type:String
    }
},{timestamps:true,toJSON:{virtuals:true}})


/// virtual populate
productSchema.virtual('MyReviews', {
ref: 'Review',
localField: '_id',
foreignField: 'product'
});

productSchema.pre(/^find/,function(){
    this.populate("MyReviews")
})

export const productModel=mongoose.model("Product",productSchema)