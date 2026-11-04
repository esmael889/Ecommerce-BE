//add Product

import slugify from "slugify";
import cloudinary from "../../Services/clouidnary.config.js";
import { CategoryModel } from "../../DB/Models/Category.Model.js";
import { SubCateogryModel } from "../../DB/Models/SubCateogry.model.js";
import { BrandModel } from "../../DB/Models/Brand.model.js";
import { productModel } from "../../DB/Models/product.model.js";
export const AddProduct=async(req,res,next)=>{

    /// 
    const{title,description,stock,price,amountOfDiscount}=req.body;

    ///Take 3 IDs
    const{categoryId,SubcategoryId,BrandId}=req.params;

    const isCategoryExist=await CategoryModel.findById(categoryId)
    const isSubExist=await SubCateogryModel.findById(SubcategoryId)
    const isBrandExist=await BrandModel.findById(BrandId);

    if(!isCategoryExist||!isSubExist||!isBrandExist){
        return next(new Error("invalid ID"))
    }

    const slug=slugify(title,"_");


    //handle dynamic price AfterDiscount
//1000  50% >>500 
    const priceAfterDiscount=price-(price*(amountOfDiscount||0)/100);
//10 -(10*5)/100
    //handle product images

    if(!req.files){
        return next(new Error("please Upload Product image"))
    }
   // store Product in DB

   /// upload clouidnary
const Images=[];
const PublicIds=[];
let ProductObj={}
for (const file of req.files) {
    const{secure_url,public_id}=await cloudinary.uploader.upload(file.path,{
        folder:`Eccomerce_Cycle5/Category_images/SubCategories/Brand/Product/${ProductObj.title}`
    })
    Images.push({secure_url,public_id})
    PublicIds.push({public_id}) /// for delete all products
}



ProductObj={
    title,
    slug,
    description,
    stock,
    price,
    amountOfDiscount,
    priceAfterDiscount,
    imageCover:Images[0],
    Images:Images.slice(1),
    PublicIds,
    categoryId,
    SubcategoryId,
    BrandId
}
const Product=await productModel.create(ProductObj);
if(!Product){
    await cloudinary.api.delete_resources(PublicIds);
    return next(new Error("please:try again To Add Product"))
}
res.json({message:"Product Added Successfully",Product})
}


//update Product

export const UpdateProduct=async(req,res,next)=>{
    //select which you want to update
        const{title,desc,stock,colors,sizes,originalPrice,amountOfDiscount}=req.body;

    ///Take 3 IDs
    const{ProductId,categoryId,SubCategoryId,BrandId}=req.params;

    //  const isCategoryExist=await CategoryModel.findById(categoryId)
    // const isSubExist=await SubCategoryModel.findById(SubCategoryId)
    // const isBrandExist=await BrandModel.findById(BrandId);
    const product=await productModel.findById(ProductId)
    // if(!isCategoryExist||!isSubExist||!isBrandExist){
    //     return next(new Error("invalid ID"))
    // }
    if(!product){
        return next(new Error("invalid Product Id"))
    }
      if(categoryId){
    const isCategoryExist=await CategoryModel.findById(categoryId);
    if(!isCategoryExist){
        return next(new Error("invalid Category"))
    }
    }
    if(SubCategoryId){
         const isSubExist=await SubCategoryModel.findById(SubCategoryId)
         if(!isSubExist){
            return next(new Error("invalid SubCategory"))
         }
    }
  
    if(BrandId){
        const isBrandExist=await BrandModel.findById(BrandId);
        if(!isBrandExist){
            return next(new Error("invalid Brand"));
        }
    }


    //price operations
    if(originalPrice&&amountOfDiscount){
         const Price_After_Discount=originalPrice-(originalPrice*(amountOfDiscount||0)/100);
    }
    else if(originalPrice){
         const Price_After_Discount=originalPrice-(originalPrice*(amountOfDiscount||0)/100);
    }
    else if(amountOfDiscount){
    const Price_After_Discount=product.originalPrice-(product.originalPrice*(amountOfDiscount||0)/100);
    }
}

//get Product

export const getAllProducts=async(req,res,next)=>{
//     const {page,size}=req.query;
// const {limit,skip}= PaginationFun({page,size})
    const Products=await productModel.find()
    res.json({message:"ALl Products : ",Products})
}


/// get specific product

export const get_Specific_product=async(req,res,next)=>{
    const {_id}=req.params;
    const Product=await productModel.findOne({_id})
    res.json({message:"The Product is : ",Product})
}

//search About Product

export const searchAboutProduct=async(req,res,next)=>{
        const {page,size,searchkey}=req.query;
const {limit,skip}= PaginationFun({page,size})
    const Products=await productModel.find({
        // {title:{$regex:title,$options:'i'}}
        $or:[
        {title:{$regex:searchkey,$options:'i'}},
        {desc:{$regex:searchkey,$options:'i'}},
        ]}
    ).limit(limit).skip(skip);
    res.json({message:"ALl Products : ",Products})
}