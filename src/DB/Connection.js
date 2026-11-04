import mongoose from "mongoose";
export const DBConnection=async()=>{
    return await mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("DB Connected Successfully");
    })
    .catch((error)=>{
        console.log("Faild To Connect",error);
    })
}




