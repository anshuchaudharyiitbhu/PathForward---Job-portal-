import express from "express";
import isauth from "../middlewares/isauthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").post(isauth, applyJob);
router.route("/get").get(isauth, getAppliedJobs);
router.route("/:id/applicants").get(isauth, getApplicants);
router.route("/status/:id/update").post(isauth, updateStatus);
 

export default router;
