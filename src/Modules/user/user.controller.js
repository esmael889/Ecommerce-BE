

import CryptoJS from "crypto-js";
import cloudinary from "../../Services/clouidnary.config.js";
import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
const get_user_Profile=async(req,res,next)=>{
    try {
        
        const{user}=req;
        user.phone=CryptoJS.AES.decrypt(user.phone,process.env.PHONE_KEY).toString(
            CryptoJS.enc.Utf8
        )
        res.json({message:"user profile exist :",data:req.file})
    } catch (error) {
        
        res.json({message:"Faild To Get user Profile",error})
    }
}




const upload_profile_picture=async(req,res,next)=>{
    try {
        // const result=await cloudinary.uploader.upload(req.file.path);

        // id
        const{_id}=req.params;
        const user=await userModel.findById({_id});
        if(!user){
            return next(new Error("user delete The Account"))
        }


        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:`Eccomerce_Cycle5/${_id}/profile_Pictures`,
            public_id:"esmael profile picture",
            overwrite:true
        });


        user.image={
            secure_url,
            public_id
        }

        await user.save();

        res.json({message:"Profile picture Uploaded Successfully",user})
    } catch (error) {
        return next(error)
    }
}



// Change user password

const change_user_pass=async(req,res,next)=>{
    try {
        const {_id}=req.params;
        const user=await userModel.findByIdAndUpdate({_id},{password:req.body.password},{new:true});
        if(!user){
            return next(new Error("user not found to change his password"))
        }
        const hashPass=bcrypt.hashSync(user.password,12);
        user.password=hashPass;
        await user.save();
        res.json({message:"password updated successfully",user})

    } catch (error) {
        return next(error);
    }
}
export {
    get_user_Profile,
    upload_profile_picture,
    change_user_pass
}