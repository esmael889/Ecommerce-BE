import { Router } from "express";
import * as Car from "./Cart.Controller.js"
const router=Router();

router.post("/add/:_id",Car.Add_To_Cart);
router.delete("/remove/:_id",Car.Remove_From_Cart);
router.put("/discount/:_id",Car.applyCoupon);
router.patch("/update/:_id",Car.updateQuantity);
router.get("/:_id",Car.getUserCart);
export default router;