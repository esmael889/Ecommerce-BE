import { CouponModel } from "../../DB/Models/Coupon.model.js";
import qrcode from "qrcode";


const Create_Coupon=async(req,res,next)=>{
    try {
        const {code,expires,discount}=req.body;

        const Coupon=await CouponModel.create({code,expires,discount});
        res.status(201).json({message:"Coupon Created Successfully",Coupon})
    } catch (error) {
        return next(error)
    }
}


const get_Coupon=async(req,res,next)=>{
    try {
        const {_id}=req.params;

        const Coupon=await CouponModel.findById({_id});
        const QR=await qrcode.toDataURL(Coupon.code);
        if(!Coupon){
            return next(new Error("Coupon Dosent exist"))
        }
        if(!QR){
            return next(new Error("qr not created"))
        }
        res.status(201).json({message:"Coupon Created Successfully",Coupon,QR})
    } catch (error) {
        return next(error)
    }
}

export {
    Create_Coupon,
    get_Coupon
}