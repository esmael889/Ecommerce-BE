import { Router } from "express";
import * as RVC from "./Review.controller.js"
import { authuntication } from "../../middleWares/authuntication.middle.js";
import { authorization } from "../../middleWares/Authorization.middle.js";
const router=Router();

router.post("/addreview",authuntication,authorization(["user"]),RVC.Create_Review);


router.patch("/:_id",authuntication,authorization(["user"]),RVC.update_Review);


router.get("/reviews",authuntication,authorization(["user"]),RVC.get_All_Reviews);

router.route("/:_id").get(authuntication,authorization(["user"]),RVC.get_Specific_Review).delete(authuntication,authorization(["user"]),RVC.delete_Review)
export default router;