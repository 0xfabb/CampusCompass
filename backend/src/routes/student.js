import express from "express";
import {
  studentLoginControl,
  studentSignUpControl,
} from "../controllers/studentAuthController.js";
import {
  getFollowControl,
  addFollowControl,
} from "../controllers/studentFollowController.js";
import { studentLoginCheck } from "../middlewares/studentLoginCheck.js";

const router = express.Router();

router.post("/register", studentSignUpControl);
router.post("/login", studentLoginControl);
router.get("/followed", getFollowControl);
router.post("/addfollow",  addFollowControl);

export default router;
