import 'dotenv/config';
import { DBConnection } from "../src/DB/Connection.js";
import express from "express"
import * as AllRouter from "../src/index.routes.js";
import cors from "cors";
export const bootstrap=()=>{

const app=express()

// test error handling

app.use(express.json())
app.use(cors())

app.use("/auth",AllRouter.AuthRouter);
app.use("/user",AllRouter.userRouter);
app.use("/category",AllRouter.CategoryRouter);
app.use("/subcategory",AllRouter.SubCategoryRouter);
app.use("/Brand",AllRouter.BrandRouter);
app.use("/product",AllRouter.ProductRouter);
app.use("/review",AllRouter.ReviewsRouter);
app.use("/wish",AllRouter.WishRouter);
app.use("/address",AllRouter.AddressRouter);
app.use("/Coupon",AllRouter.CouponRouter);
app.use("/cart",AllRouter.CartRouter);
app.use("/order",AllRouter.OrderRouter);
app.use((req,res,next)=>{
    return next(new Error("Invalid URL",{cause:400}))
})
/// global error middleWare








app.use((err,req,res,next)=>{
    // console.log(err);
    return res.json({message:err.message})
})

DBConnection()
app.listen(process.env.PORT||7000,()=>{
    console.log("server is Runnninnng");
})
}