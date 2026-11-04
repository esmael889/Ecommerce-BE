
// Create Review

import { reviewModel } from "../../DB/Models/Reviews.model.js";

const Create_Review=async(req,res,next)=>{
    try {
        const {Comment,rate,product,user}=req.body;

        // Check if user Review the same product before

        const isReviewed=await reviewModel.findOne({user,product});
        if(isReviewed){
        return next(new Error("You reviewd it before",{cause:403}))
        }
        const review=await reviewModel.create({Comment,rate,product,user});
        res.status(201).json({message:"Review Created Successfully",review});
    } catch (error) {
        return next(error)
    }
};


// update review  >> the user that create it >> update it

const update_Review=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const {userId,Comment,rate}=req.body;
        const review=await reviewModel.findOneAndUpdate({_id,user:userId},{
            Comment,
            rate
        },{new:true})
        if(!review){
            return next(new Error("Cant update review on this product as , you are not the reviewer"))
        }
        res.status(201).json({message:"Reviewed updated successfully",review})
    } catch (error) {
        return next(error)
    }
}



// get All Reviews 

const get_All_Reviews=async(req,res,next)=>{
    try {
        const Reviews=await reviewModel.find();
        res.json({message:"All Reviews",Reviews})
    } catch (error) {
        return next(error)
    }
}


// get specific review


const get_Specific_Review=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const Review=await reviewModel.findById(_id);
        if(!Review){
            return next(new Error("REview not found"))
        }
        res.json({message:"The Review is",Review,toObject:{virtuals:true}})
    } catch (error) {
        return next(error)
    }
}



// delete Review

const delete_Review=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const review=await reviewModel.findByIdAndDelete(_id);
        if(!review){
            return next(new Error("review not found to delete"))
        }
        res.json({message:"Review Deleted Successfully",review})
    } catch (error) {
        return next(error)
    }
}
export{
    Create_Review,
    update_Review,
    get_All_Reviews,
    get_Specific_Review,
    delete_Review
}