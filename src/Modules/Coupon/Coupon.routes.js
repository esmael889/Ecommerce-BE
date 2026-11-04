import { Router } from "express";
import * as CO from "./Coupon.Controller.js"
const router=Router();
router.post("/add",CO.Create_Coupon);
router.get("/:_id",CO.get_Coupon);
export default router;