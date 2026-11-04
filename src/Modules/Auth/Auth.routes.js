
import { Router } from "express";
import * as UC from "./Auth.controller.js"
import * as AuthMiddle from "../Auth/auth.validation.js";
import { Validation_middle } from "../../middleWares/Validation.middle.js";
const router=Router();

router.post("/Register",Validation_middle(AuthMiddle.RegisterSchema),UC.Register);
router.post("/Login",UC.Login);
router.get("/activate_Account/:token",UC.activate_Account)
export default router;