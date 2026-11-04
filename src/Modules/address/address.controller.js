import { userModel } from "../../DB/Models/user.model.js";


const add_To_address=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const user=await userModel.findByIdAndUpdate({_id},{
            $addToSet:{Address:req.body}    
        },{new:true});
        if(!user){
            return next(new Error("user notFound To Add Address to it"))
        }
        res.status(201).json({message:"Address Addedd Successfully",user:user.Address});
    } catch (error) {
        return next(error)
    }
}


const remove_From_address=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const user=await userModel.findByIdAndUpdate({_id},{
            $pull:{Address:{_id:req.body.address}}   
        },{new:true});
        if(!user){
            return next(new Error("user notFound To Add Address to it"))
        }
        res.status(201).json({message:"Address Deleted Successfully",user});
    } catch (error) {
        return next(error)
    }
}

const get_All_Addrsess=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const user=await userModel.findOne({_id});
        if(!user){
            return next(new Error("user not found to get it's address"))
        }
        res.status(200).json({message:"user addresess :",Addresses:user.Address})
    } catch (error) {
        return next(error)
    }
}


export {
    add_To_address,
    remove_From_address,
    get_All_Addrsess
}