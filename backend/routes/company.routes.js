import express from "express";

import isauth from "../middlewares/isauthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";
const router=express.Router();
router.route("/register").post(isauth,singleUpload, registerCompany);
router.route("/get").get(isauth,getCompany);
router.route("/get/:id").get(isauth,getCompanyById);
router.route("/update/:id").post(isauth,singleUpload,updateCompany);
export default router;