import express from "express";
import {
  ccfetchControl,
  authLoginControl,
  getAuthControl,
} from "../controllers/authRouteController.js";

const router = express.Router();

router.post("/login", authLoginControl);
router.get("/getAuth", getAuthControl)
router.get("/uvcc", ccfetchControl);

export default router;
