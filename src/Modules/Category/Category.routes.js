import { Router } from "express";

import * as CC from "./Category.controller.js"
import { MulterWithCloud } from "../../Services/multerWithCloud.js";
const router=Router();
router.post("/addCategory",MulterWithCloud().single("image"),CC.add_Category)
router.get("/AllCategories",CC.get_AllCategories);




router.route("/:_id")
.get(CC.get_Category)
.delete(CC.delete_Category)
.patch(CC.update_Category)

export default router;