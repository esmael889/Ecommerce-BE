

import { Router } from "express";
import * as WL from "./Wishlist.controller.js"
const router=Router();
router.patch("/add",WL.add_To_Wishlist)
router.delete("/remove",WL.delete_From_Wishlist)
router.get("/:_id",WL.get_AllUser_WishList)
export default router;