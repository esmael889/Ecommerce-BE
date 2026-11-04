import { Router } from "express";
import * as ADC from "./address.controller.js"
const router=Router();

router.post("/add/:_id",ADC.add_To_address);
router.delete("/remove/:_id",ADC.remove_From_address);
router.get("/:_id",ADC.get_All_Addrsess);
export default router;