import { Router } from "express";
import * as Sub from "./SubCategory.controller.js"
const router=Router();

router.post("/addsub",Sub.add_SubCategory);
router.get("/",Sub.get_AllSubCategories);
export default router;