import express from "express";
import {
  studentLoginControl,
  studentSignUpControl,
} from "../controllers/studentAuthController.js";
import {
  getFollowControl,
  addFollowControl,
} from "../controllers/studentFollowController.js";

import {studentverifycheck} from "../middlewares/studentverifycheck.js"

const router = express.Router();

router.post("/register", studentSignUpControl);
router.post("/login", studentLoginControl);
router.get("/followed", getFollowControl);
router.post("/addfollow",  addFollowControl);
router.get("/check-auth-student", studentverifycheck);

export default router;
