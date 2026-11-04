import { userModel } from "../../DB/Models/user.model.js";

const add_To_Wishlist=async(req,res,next)=>{
    try {
        const {product,_id}=req.body;
        const result=await userModel.findByIdAndUpdate({_id},{$addToSet:{WishLists:product}},{new:true});
        if(!product){
            return next(new Error("product was deleted , so you cant add it to wishlist"))
        }
        if(!result){
            return next(new Error("user not found to add to its whishlist"))
        }

        res.status(201).json({message:"Product addedd Successfully to wishlist",WishLists:result.WishLists})
    } catch (error) {
        return next(error)
    }
}


const delete_From_Wishlist=async(req,res,next)=>{
    try {
        const {product,_id}=req.body;
        const result=await userModel.findByIdAndUpdate({_id},{$pull:{WishLists:product}},{new:true});
        if(!product){
            return next(new Error("product was deleted , so you cant add it to wishlist"))
        }
        if(!result){
            return next(new Error("user not found to add to its whishlist"))
        }

        res.status(201).json({message:"Product deleted Successfully From wishlist",WishLists:result.WishLists})
    } catch (error) {
        return next(error)
    }
}


const get_AllUser_WishList=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const result=await userModel.findOne({_id}).populate("WishLists");
        if(!result){
            return next(new Error("user not found to get its whishlist"))
        }
        res.status(200).json({message:"your Wishlist:",result:result.WishLists})
    } catch (error) {
        return next(error)
    }
}
export {
    add_To_Wishlist,
    delete_From_Wishlist,
    get_AllUser_WishList
}