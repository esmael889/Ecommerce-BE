
import { Router } from "express";
import express from "express"
import * as OC from "./Order.Controller.js"
import { authuntication } from "../../middleWares/authuntication.middle.js";
const router=Router();

export default router;


router.post("/create/:_id",OC.Create_Cash_Order);
router.get("/AllOrders",OC.get_All_orders);
router.get("/:_id",OC.get_user_orders);



router.post("/checkout/:_id",authuntication,OC.Create_Checkout_Session)
/// instaed of success url and close url
router.get("/payment/success", (req, res) => {
    res.send("Payment completed successfully!");
});

router.get("/payment/cancel", (req, res) => {
    res.send("Payment was cancelled!");
});


