import {Router} from "express";
import * as BC from "./Brand.Controller.js"
import { MulterWithCloud } from "../../Services/multerWithCloud.js";
const router =Router();
router.post("/:categoryId/:SubCategoryId",MulterWithCloud().single("logo"),BC.CreateBrand);
export default router;