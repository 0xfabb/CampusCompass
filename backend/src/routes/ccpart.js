import express from "express";
import {
  newCC_control,
  ccdatacontrol,
} from "../controllers/ccroutescontroller.js";
import { ccverifycheck } from "../middlewares/ccverifycheck.js";
const router = express.Router();

router.post("/ccsignup", newCC_control);
router.get("/ccdata", ccverifycheck, ccdatacontrol);

export default router;
