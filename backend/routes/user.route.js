import express from "express";
import { updateprofile,register,login,logout } from "../controller/user.controller.js";
import isauth from "../middlewares/isauthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const router=express.Router();
router.route("/register").post(singleUpload, register);
router.route("/login").post(singleUpload,login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isauth,singleUpload,updateprofile);
export default router;