import express from "express";
import {
  studentLoginControl,
  studentSignUpControl,
  logoutStudentControl,
} from "../controllers/studentAuthController.js";
import {
  getFollowControl,
  addFollowControl,
} from "../controllers/studentFollowController.js";

import { studentverifycheck } from "../middlewares/studentverifycheck.js";
import { studentLoginCheck } from "../middlewares/studentLoginCheck.js";

const router = express.Router();

router.post("/register", studentSignUpControl);
router.post("/login", studentLoginControl);
router.get("/followed", studentLoginCheck, getFollowControl);
router.post("/addfollow", addFollowControl);
router.get("/logout-student", logoutStudentControl);
router.get("/check-auth-student", studentverifycheck);

export default router;
