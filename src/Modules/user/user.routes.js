import { Router } from "express";
import * as UC from "./user.controller.js"
import { authuntication } from "../../middleWares/authuntication.middle.js";
import { authorization } from "../../middleWares/Authorization.middle.js";
import { AllowedExtenstions, multerFunction } from "../../Services/MulterLocally.js";
import { MulterWithCloud } from "../../Services/multerWithCloud.js";
const router=Router();

router.get("/profile",authuntication,authorization(["user"]),multerFunction([...AllowedExtenstions.Files,...AllowedExtenstions.Images],"user/profile_pictures").single("profile"),UC.get_user_Profile);

router.post("/upload/:_id",MulterWithCloud().single("image"),UC.upload_profile_picture);

// Change password
router.patch("/changePass/:_id",authuntication,authorization(["user"]),UC.change_user_pass)
export default router;