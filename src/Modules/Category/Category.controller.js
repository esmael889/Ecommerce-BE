import { CategoryModel } from "../../DB/Models/Category.Model.js";
import cloudinary from "../../Services/clouidnary.config.js";
import slugify from "slugify";
const add_Category=async(req,res,next)=>{
    try {
        const{name}=req.body;
        const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:`Eccomerce_Cycle5/Category_images`,
            public_id:"Category image",
            overwrite:true
        });
        const Category=await CategoryModel.create({
            name,
            slug:slugify(name,"+"),
            image:{
                secure_url,
                public_id
            }
        })

        res.json({message:"Category Created Successfully",Category})
    } catch (error) {
        return next(error)
    }
}


const get_AllCategories=async(req,res,next)=>{
    try {
        const Categories=await CategoryModel.find();
        res.json({message:"Categories: ",Categories})
    } catch (error) {
        return next(error)
    }
}



const update_Category=async(req,res,next)=>{
    try {
        const{_id}=req.params;
        const {name}=req.body
        const Category=await CategoryModel.findByIdAndUpdate({_id},{name,slug:slugify(name)},{new:true});
        res.json({message:"Category is : ",Category})
    } catch (error) {
        return next(error)
    }
}


const get_Category=async(req,res,next)=>{
    try {
        const{_id}=req.params;
        const Category=await CategoryModel.findById(_id);
        res.json({message:"Category is : ",Category})
    } catch (error) {
        return next(error)
    }
}

const delete_Category=async(req,res,next)=>{
    try {
        const{_id}=req.params;
        const Category=await CategoryModel.findByIdAndDelete(_id);
        res.json({message:"Category is deleted: ",Category})
    } catch (error) {
        return next(error)
    }
}
export {
    add_Category,
    get_AllCategories,
    get_Category,
    update_Category,
    delete_Category
}