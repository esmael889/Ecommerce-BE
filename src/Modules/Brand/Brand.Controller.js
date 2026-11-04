//add Brand

import slugify from "slugify";
import cloudinary from "../../Services/clouidnary.config.js";
import { CategoryModel } from "../../DB/Models/Category.Model.js";
import { SubCateogryModel } from "../../DB/Models/SubCateogry.model.js";
import { BrandModel } from "../../DB/Models/Brand.model.js";
export const CreateBrand=async(req,res,next)=>{
    const{name}=req.query;
    const slug=slugify(name,"_");
    const{categoryId,SubCategoryId}=req.params;
    const isCategoryExist=await CategoryModel.findById(categoryId);
    const isSubExist=await SubCateogryModel.findById(SubCategoryId);
    if(!isCategoryExist||!isSubExist){
        return next(new Error("invalid category or subCategory Id"));
    }

    //image uploading

    if(!req.file){
        return next(new Error("please Upload Brand image"));
    }

    //upload to clouidnary

    const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:`Eccomerce_Cycle5/Category_images/SubCategories/Brand`
    })

    //store in DB
    const BrandObj={
        name,
        slug,
        logo:{
            secure_url,
            public_id,
        },
        SubCategoryId,
    }

    //add in Brand Model

    const brandmodel=await BrandModel.create(BrandObj);

    if(!brandmodel){
        await cloudinary.uploader.destroy(public_id);
        return next(new Error("invalid exixtence of brand , try again later"))
    }
    res.json({message:"Brand Added Successfully",brandmodel})
}


//getAllBrands

export const GetAllBrands=async(req,res,next)=>{

    const brands=await BrandModel.find();
    if(!brands){
        return next(new Error("no brands Exist"))
    }
    res.json({message:"All Brands: ",brands})
}