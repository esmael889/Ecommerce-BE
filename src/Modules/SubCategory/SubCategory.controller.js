import { CategoryModel } from "../../DB/Models/Category.Model.js";
import { SubCateogryModel } from "../../DB/Models/SubCateogry.model.js";
import slugify from "slugify"

const add_SubCategory=async(req,res,next)=>{
    try {
        const {name,CategoryId}=req.body;
        const isCategoryExist=await CategoryModel.findById({_id:CategoryId});
        if(!isCategoryExist){
            return next(new Error("Category not exist to add subCategory"))
        }
        const subCategory=await SubCateogryModel.create({name,CategoryId,slug:slugify(name)});
        res.status(201).json({message:"SubCategory Created Successfully",subCategory})
    } catch (error) {
        return next(error)
    }
}



const get_AllSubCategories=async(req,res,next)=>{
    try {
        // Check Category exist or not
        const{CategoryId}=req.body
    const isCategoryExist=await CategoryModel.findById({_id:CategoryId});
        if(!isCategoryExist){
            return next(new Error("Category not exist to get subCategories"))
        }
        const sucCategories=await SubCateogryModel.find();
        res.status(200).json({message:"All SubCategories",sucCategories})
    } catch (error) {
        return next(error)
    }
}

export {
    add_SubCategory,
    get_AllSubCategories
}