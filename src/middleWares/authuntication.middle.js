
import jwt from "jsonwebtoken";
import { userModel } from "../DB/Models/user.model.js";

export const RolesTypes={
    user:"user",
    admin:"admin"
}
export const authuntication=async(req,res,next)=>{
        const {authorization}=req.headers;

        const [Bearer,token]=authorization.split(" ");
        let tokenSignature=undefined;
    try {
        switch (Bearer) {
            case "user":
            tokenSignature=process.env.USER_TOKEN
                break;

            case "admin":
                tokenSignature=process.env.Admin_Token
        break;
            default:
                break;
        }

                /// verify token
                const {id}=jwt.verify(token,tokenSignature);
                // console.log(verify_Token);
                const user=await userModel.findById(id);
                if(!user){
                    return res.json({message:"user Not Found"})
                }
                req.user=user;
                return next();
    } catch (error) {
        if(error.name=="TokenExpiredError"&&error.message=="jwt expired"){
            
            const find_user=await userModel.findOne({token});
            if(!find_user){
                // return res.json({message:"user dosent exist to generate refresh Tok"})

                return next(new Error("user dosent exist to generate refresh Tok"))
            }

            /// Create Refresh Token
                    const refresh_token=jwt.sign({id:find_user._id},find_user.role==RolesTypes.user?process.env.USER_TOKEN:process.env.Admin_Token,{expiresIn:"1w"});
                    find_user.token=refresh_token;
                await  find_user.save();
                res.json({message:"Token Refreshed Successfully",refresh_token})
        }
        // res.json({message:"authntication error",error})
        console.log("JWT Error Name:", error.name);
console.log("JWT Error Message:", error.message);
        return next(error)
    }
}