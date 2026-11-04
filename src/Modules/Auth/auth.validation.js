import  Joi from "joi";
export const RegisterSchema=Joi.object({
name:Joi.string().min(3).max(30).required(),
email:Joi.string().email({tlds:[".com",".net"]}).pattern(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/).required(),
password:Joi.string().required().min(8),
confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
phone:Joi.string(),
gender:Joi.string().valid("male","female"),
}).required()


export const LoginSchema=Joi.object({
email:Joi.string().email({tlds:[".com",".net"]}).pattern(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/).required(),
password:Joi.string().required().min(8),
}).required()