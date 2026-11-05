
import "dotenv/config";
import express from "express";
import cors from "cors";

import { DBConnection } from "./src/DB/Connection.js";
import * as AllRouter from "./src/index.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

// Database connection
DBConnection();

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "Ecommerce API is running successfully"
    });
});

// Routes
app.use("/auth", AllRouter.AuthRouter);
app.use("/user", AllRouter.userRouter);
app.use("/category", AllRouter.CategoryRouter);
app.use("/subcategory", AllRouter.SubCategoryRouter);
app.use("/Brand", AllRouter.BrandRouter);
app.use("/product", AllRouter.ProductRouter);
app.use("/review", AllRouter.ReviewsRouter);
app.use("/wish", AllRouter.WishRouter);
app.use("/address", AllRouter.AddressRouter);
app.use("/Coupon", AllRouter.CouponRouter);
app.use("/cart", AllRouter.CartRouter);
app.use("/order", AllRouter.OrderRouter);

// Invalid URL
app.use((req, res, next) => {
    next(new Error("Invalid URL"));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        message: err.message
    });
});

// Important for Vercel
export default app;
