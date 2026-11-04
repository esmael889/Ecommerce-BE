import AuthRouter from "../src/Modules/Auth/Auth.routes.js"
import userRouter from "../src/Modules/user/user.routes.js"
import CategoryRouter from "../src/Modules/Category/Category.routes.js"
import SubCategoryRouter from "../src/Modules/SubCategory/SubCategory.routes.js";
import BrandRouter from "../src/Modules/Brand/Brand.Routes.js";
import ReviewsRouter from "../src/Modules/Review/Review.routes.js";
import ProductRouter from "../src/Modules/Product/Product.routes.js";
import WishRouter from "../src/Modules/Wishlist/Wishlist.routes.js";
import AddressRouter from "../src/Modules/address/address.routes.js";
import CouponRouter from "../src/Modules/Coupon/Coupon.routes.js";
import CartRouter from "../src/Modules/Cart/Cart.routes.js";
import OrderRouter from "../src/Modules/Order/Order.routes.js";
import express from "express";
const app=express();

export {
    AuthRouter,
    CategoryRouter,
    userRouter,
    SubCategoryRouter,
    BrandRouter,
    ProductRouter,
    ReviewsRouter,
    WishRouter,
    AddressRouter,
    CouponRouter,
    CartRouter,
    OrderRouter
}