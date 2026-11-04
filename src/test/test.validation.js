

/// 1- data

import  Joi from "joi";

const user={
    name:"omar",
    email:"omar@gmail.com",
    age:25,
    password:"ahmed123",
    confirmPassword:"ahmed123",
    isLive:true,
    skills:["js"]
}

//2- Schema
const schema=Joi.object({
    name:Joi.string().required().min(3).max(30),
    email:Joi.string().email({tlds:[".com",".net"]}).pattern(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/).required(),
    age:Joi.number().min(20).max(50),
    password:Joi.string().required().min(8),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
    isLive:Joi.boolean(),
    skills:Joi.array().items(Joi.string().required()).required()
}).required()


// 3- validate(Compare)

const result=schema.validate(user,{abortEarly:false});
console.log(result);
