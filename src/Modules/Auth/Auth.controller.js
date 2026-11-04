
/// Register

import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../../DB/Models/user.model.js";
import { RolesTypes } from "../../middleWares/authuntication.middle.js";
import { SendEmail, Subjects } from "../../Services/SendeingEmailService.js";
import { signUP_Temp } from "../../Services/TempleteofEmail.js";

const Register=async(req,res,next)=>{
    try {
        const {name,email,password,confirmPassword,phone,gender,role}=req.body;

        /// Check email

        const emailCheck=await userModel.findOne({
            email
        });

        if(emailCheck){
            return res.json({message:"email is already exist,please choose another one"})
        }

        // Check password == confirmPassword
        if(password!==confirmPassword){
            return res.json({message:"password dosent match The confirmed password"})
        }


        //Hashing password

        const hashedPassword= bcrypt.hashSync(password,12);


        const EncryptPhone=CryptoJS.AES.encrypt(phone,process.env.PHONE_KEY).toString()
        //Registerrrrrr
        const user=await userModel.create({
            name,
            email,
            password:hashedPassword,
            phone:EncryptPhone,
            gender,
            role
        })

        /// send Email service

        const token=jwt.sign({email},"EmailKey");
        const link=`http://localhost:7000/auth/activate_Account/${token}`

    await  SendEmail({
        to:email,
        subject:Subjects.Register,
        html:signUP_Temp(name,link)
        })
        // console.log(user);
        res.json({message:"Register Successfully",user})
    } catch (error) {
        res.json({message:"Faild To Register",error})
    }
}


const Login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;

        /// Check email

        const user=await userModel.findOne({
            email
        });
        if(!user){
            // return res.json({message:"email does not exist , please , Go To Register"})

            return next(new Error("email does not exist , please , Go To Register"))
        }

        // Check for confirmation of Email
    if(user.ConfirmEmail==false){
        
            return res.json({message:"please activate your account"})
    }

        const isPasswordMatch=bcrypt.compareSync(password,user.password)

        if(! isPasswordMatch){
            return res.json({message:"invalid password"})
        }

        //// Generate Token

        const token=jwt.sign({id:user._id},user.role==RolesTypes.user?process.env.USER_TOKEN:process.env.Admin_Token,{expiresIn:20});

        user.token=token;
    await  user.save();

        res.json({message:"user Loged In Successfully",token})
    } catch (error) {
        return next(error)
    }
}


const activate_Account=async(req,res,next)=>{
    try {
        const{token}=req.params;
        const{email}=jwt.verify(token,"EmailKey");

        const user=await userModel.findOne({email});
        if(!user){
            return res.json({message:"user notfound to activate Account"})
        }
        user.ConfirmEmail=true;
        await user.save();
        res.json({message:"Account Activated Donne"});

    } catch (error) {
        res.json({message:"Activation faild"})
    }
}
export {
    Register,
    Login,
    activate_Account
}