import {Router} from "express";
import * as pc from "./Product.controller.js"
import { MulterWithCloud } from "../../Services/multerWithCloud.js";
const router=Router();
router.post("/addproduct/:categoryId/:SubcategoryId/:BrandId",MulterWithCloud().array("images"),pc.AddProduct);


router.get("/:_id",pc.get_Specific_product);
router.get("/",pc.getAllProducts);
export default router;