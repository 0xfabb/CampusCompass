import express from "express";
import {
  newCC_control,
  ccdatacontrol,
} from "../controllers/ccroutescontroller.js";
import { ccverifycheck, cclogout } from "../middlewares/ccverifycheck.js";
const router = express.Router();

router.post("/ccsignup", newCC_control);
router.post("/ccdata" ,ccdatacontrol);
router.get("/check-auth", ccverifycheck);
router.get("/cclogout", cclogout );


export default router;
